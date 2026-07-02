<template>
  <div
    :class="[
      'ctable-wrap',
      `ctable-wrap--${size}`,
      {
        'is-border': border,
        'is-stripe': stripe,
        'is-loading': loading,
        'has-footer': showSummary || pagination,
      },
    ]"
  >
    <div class="ctable__scroll" :style="scrollStyle">
      <table class="ctable" :style="tableStyle">
        <colgroup v-if="hasColumnWidth">
          <col
            v-for="(col, index) in normalizedColumns"
            :key="`col-${index}`"
            :style="getColStyle(col)"
          />
        </colgroup>

        <thead v-if="showHeader" class="ctable__head">
          <tr>
            <th
              v-for="(col, colIndex) in normalizedColumns"
              :key="col.key"
              :class="getHeaderClass(col, colIndex)"
              :style="getCellStyle(col, colIndex, true)"
              @click="onHeaderClick(col)"
            >
              <template v-if="col.type === 'selection'">
                <CCheckbox
                  :model-value="isAllSelected"
                  :indeterminate="isIndeterminate"
                  size="small"
                  @change="toggleAllSelection"
                />
              </template>
              <template v-else-if="col.type === 'expand'">
                <span class="ctable__expand-placeholder" />
              </template>
              <template v-else-if="$slots[`header-${col.prop}`]">
                <slot :name="`header-${col.prop}`" :column="col" />
              </template>
              <template v-else>
                <span class="ctable__label">{{ col.label }}</span>
                <span v-if="col.sortable" class="ctable__sort">
                  <span
                    :class="[
                      'ctable__sort-icon',
                      { 'is-active': sortProp === col.prop && sortOrder === 'asc' },
                    ]"
                  >▲</span>
                  <span
                    :class="[
                      'ctable__sort-icon',
                      { 'is-active': sortProp === col.prop && sortOrder === 'desc' },
                    ]"
                  >▼</span>
                </span>
              </template>
            </th>
          </tr>
        </thead>

        <tbody class="ctable__body">
          <tr v-if="!sortedData.length && !loading">
            <td :colspan="normalizedColumns.length" class="ctable__empty">
              <slot name="empty">{{ emptyText }}</slot>
            </td>
          </tr>

          <template v-for="(row, rowIndex) in paginatedData" :key="getRowKey(row, getSourceIndex(row))">
            <tr
              :class="getRowClass(row, getSourceIndex(row))"
              @click="onRowClick(row, getSourceIndex(row))"
            >
              <td
                v-for="(col, colIndex) in normalizedColumns"
                :key="`${getRowKey(row, getSourceIndex(row))}-${col.key}`"
                :class="getBodyCellClass(col, row, getSourceIndex(row), colIndex)"
                :style="getCellStyle(col, colIndex)"
              >
                <template v-if="col.type === 'selection'">
                  <CCheckbox
                    :model-value="isRowSelected(row, getSourceIndex(row))"
                    :disabled="!isRowSelectable(row, getSourceIndex(row))"
                    size="small"
                    @change="(checked) => toggleRowSelection(row, getSourceIndex(row), checked)"
                    @click.stop
                  />
                </template>
                <template v-else-if="col.type === 'expand'">
                  <button
                    type="button"
                    class="ctable__expand-btn"
                    :aria-expanded="isRowExpanded(row, getSourceIndex(row))"
                    @click.stop="toggleExpand(row, getSourceIndex(row))"
                  >
                    <CIcon
                      name="chevron-right"
                      :size="14"
                      :class="[
                        'ctable__expand-icon',
                        { 'is-expanded': isRowExpanded(row, getSourceIndex(row)) },
                      ]"
                    />
                  </button>
                </template>
                <template v-else-if="col.type === 'index'">
                  {{ indexOffset + rowIndex + 1 }}
                </template>
                <template v-else-if="$slots[`cell-${col.prop}`]">
                  <slot
                    :name="`cell-${col.prop}`"
                    :row="row"
                    :column="col"
                    :index="getSourceIndex(row)"
                    :value="getCellValue(row, col)"
                  />
                </template>
                <template v-else>
                  <CTooltip
                    v-if="shouldUseTooltip(col)"
                    :content="getCellTooltipContent(col, row, getSourceIndex(row))"
                    :only-overflow="getCellOverflowMode(col) === 'both'"
                    placement="top"
                  >
                    <span
                      :class="[
                        'ctable__cell-text',
                        {
                          'ctable__ellipsis': shouldEllipsis(col),
                          'ctable__cell-text--tooltip': getCellOverflowMode(col) === 'tooltip',
                        },
                      ]"
                    >
                      {{ formatCell(row, col, getSourceIndex(row)) }}
                    </span>
                  </CTooltip>
                  <span
                    v-else-if="getCellOverflowMode(col) === 'ellipsis'"
                    :class="['ctable__cell-text', 'ctable__ellipsis']"
                  >
                    {{ formatCell(row, col, getSourceIndex(row)) }}
                  </span>
                  <template v-else>
                    {{ formatCell(row, col, getSourceIndex(row)) }}
                  </template>
                </template>
              </td>
            </tr>

            <tr
              v-if="isRowExpanded(row, getSourceIndex(row))"
              :key="`${getRowKey(row, getSourceIndex(row))}-expand`"
              class="ctable__expand-row"
            >
              <td :colspan="normalizedColumns.length" class="ctable__expand-cell">
                <slot name="expand" :row="row" :index="getSourceIndex(row)" />
              </td>
            </tr>
          </template>
        </tbody>

        <tfoot v-if="showSummary && sortedData.length" class="ctable__foot">
          <tr>
            <td
              v-for="(col, colIndex) in normalizedColumns"
              :key="`summary-${col.key}`"
              :class="getBodyCellClass(col, null, -1, colIndex, true)"
              :style="getCellStyle(col, colIndex)"
            >
              {{ summaryCells[colIndex] }}
            </td>
          </tr>
        </tfoot>
      </table>
    </div>

    <div v-if="loading" class="ctable__loading">
      <span class="ctable__spinner" aria-hidden="true" />
      <span class="ctable__loading-text">{{ loadingText }}</span>
    </div>

    <div v-if="pagination && sortedData.length" class="ctable__pagination">
      <span class="ctable__pagination-total">共 {{ totalCount }} 条</span>
      <div class="ctable__pagination-actions">
        <label v-if="pageSizes.length" class="ctable__page-size">
          <span class="ctable__page-size-label">每页</span>
          <select
            class="ctable__page-size-select"
            :value="pageSize"
            @change="onPageSizeChange"
          >
            <option v-for="size in pageSizes" :key="size" :value="size">{{ size }} 条</option>
          </select>
        </label>
        <button
          type="button"
          class="ctable__page-btn"
          :disabled="currentPage <= 1"
          @click="goPage(currentPage - 1)"
        >
          上一页
        </button>
        <span class="ctable__page-info">{{ currentPage }} / {{ totalPages }}</span>
        <button
          type="button"
          class="ctable__page-btn"
          :disabled="currentPage >= totalPages"
          @click="goPage(currentPage + 1)"
        >
          下一页
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import CCheckbox from './CCheckbox.vue'
import CIcon from './CIcon.vue'
import CTooltip from './CTooltip.vue'

function getNestedValue(obj, path) {
  if (!path) return undefined
  return String(path)
    .split('.')
    .reduce((acc, key) => (acc == null ? acc : acc[key]), obj)
}

function parseWidth(width) {
  if (typeof width === 'number') return width
  if (typeof width === 'string') {
    const num = parseFloat(width)
    return Number.isNaN(num) ? 0 : num
  }
  return 0
}

export default {
  name: 'CTable',

  components: { CCheckbox, CIcon, CTooltip },

  props: {
    data: { type: Array, default: () => [] },

    columns: { type: Array, default: () => [] },

    stripe: { type: Boolean, default: false },

    border: { type: Boolean, default: false },

    size: {
      type: String,
      default: 'medium',
      validator: (v) => ['small', 'medium', 'large'].includes(v),
    },

    loading: { type: Boolean, default: false },

    loadingText: { type: String, default: '加载中...' },

    emptyText: { type: String, default: '暂无数据' },

    rowKey: { type: [String, Function], default: 'id' },

    highlightCurrentRow: { type: Boolean, default: false },

    showHeader: { type: Boolean, default: true },

    height: { type: [String, Number], default: '' },

    maxHeight: { type: [String, Number], default: '' },

    selectedKeys: { type: Array, default: () => [] },

    expandRowKeys: { type: Array, default: () => [] },

    defaultSort: { type: Object, default: null },

    showOverflowTooltip: { type: Boolean, default: false },

    selectable: { type: Function, default: null },

    rowClassName: { type: [String, Function], default: '' },

    showSummary: { type: Boolean, default: false },

    summaryMethod: { type: Function, default: null },

    summaryText: { type: String, default: '合计' },

    pagination: { type: Boolean, default: false },

    pageSize: { type: Number, default: 10 },

    pageSizes: { type: Array, default: () => [] },

    currentPage: { type: Number, default: 1 },

    total: { type: Number, default: 0 },
  },

  emits: [
    'update:selectedKeys',
    'update:expandRowKeys',
    'update:currentPage',
    'update:pageSize',
    'rowClick',
    'currentChange',
    'selectionChange',
    'sortChange',
    'expandChange',
    'pageChange',
    'pageSizeChange',
  ],

  data() {
    return {
      sortProp: '',
      sortOrder: null,
      currentRowKey: null,
    }
  },

  computed: {
    normalizedColumns() {
      return this.columns.map((col, index) => ({
        ...col,
        key: col.prop || col.type || `col-${index}`,
        align: col.align || 'left',
        headerAlign: col.headerAlign || col.align || 'left',
      }))
    },

    hasColumnWidth() {
      return this.normalizedColumns.some((col) => col.width || col.minWidth)
    },

    tableStyle() {
      return null
    },

    scrollStyle() {
      const style = {}
      if (this.height) {
        style.height = typeof this.height === 'number' ? `${this.height}px` : this.height
      }
      if (this.maxHeight) {
        style.maxHeight =
          typeof this.maxHeight === 'number' ? `${this.maxHeight}px` : this.maxHeight
      }
      return Object.keys(style).length ? style : null
    },

    sortedData() {
      if (!this.sortProp || !this.sortOrder) return this.data

      const prop = this.sortProp
      const order = this.sortOrder
      const sorted = [...this.data]

      sorted.sort((a, b) => {
        const av = getNestedValue(a, prop)
        const bv = getNestedValue(b, prop)

        if (av === bv) return 0
        if (av == null) return 1
        if (bv == null) return -1

        if (typeof av === 'number' && typeof bv === 'number') {
          return order === 'asc' ? av - bv : bv - av
        }

        const result = String(av).localeCompare(String(bv), 'zh-CN', { numeric: true })
        return order === 'asc' ? result : -result
      })

      return sorted
    },

    totalCount() {
      return this.total || this.sortedData.length
    },

    totalPages() {
      return Math.max(1, Math.ceil(this.totalCount / this.pageSize))
    },

    indexOffset() {
      if (!this.pagination) return 0
      return (this.currentPage - 1) * this.pageSize
    },

    paginatedData() {
      if (!this.pagination) return this.sortedData
      const start = this.indexOffset
      return this.sortedData.slice(start, start + this.pageSize)
    },

    paginatedSourceIndexMap() {
      const map = new Map()
      this.paginatedData.forEach((row, pageIndex) => {
        const sourceIndex = this.pagination ? this.indexOffset + pageIndex : pageIndex
        map.set(row, sourceIndex)
      })
      return map
    },

    selectedKeySet() {
      return new Set(this.selectedKeys)
    },

    expandKeySet() {
      return new Set(this.expandRowKeys)
    },

    selectableRows() {
      return this.data.map((row, index) => ({
        row,
        index,
        key: this.getRowKey(row, index),
      }))
    },

    enabledSelectableRows() {
      return this.selectableRows.filter(({ row, index }) => this.isRowSelectable(row, index))
    },

    isAllSelected() {
      if (!this.enabledSelectableRows.length) return false
      return this.enabledSelectableRows.every(({ key }) => this.selectedKeySet.has(key))
    },

    isIndeterminate() {
      if (!this.enabledSelectableRows.length) return false
      const count = this.enabledSelectableRows.filter(({ key }) =>
        this.selectedKeySet.has(key)
      ).length
      return count > 0 && count < this.enabledSelectableRows.length
    },

    summaryCells() {
      if (!this.showSummary || !this.sortedData.length) return []

      if (typeof this.summaryMethod === 'function') {
        return this.summaryMethod({
          columns: this.normalizedColumns,
          data: this.sortedData,
        })
      }

      return this.normalizedColumns.map((col, index) => {
        if (index === 0) return this.summaryText
        if (!col.prop) return ''

        const values = this.sortedData.map((row) => getNestedValue(row, col.prop))
        if (values.length && values.every((v) => typeof v === 'number' && !Number.isNaN(v))) {
          return values.reduce((sum, v) => sum + v, 0)
        }
        return ''
      })
    },

    fixedLeftOffsets() {
      const offsets = {}
      let offset = 0
      this.normalizedColumns.forEach((col, index) => {
        if (col.fixed === 'left') {
          offsets[index] = offset
          offset += parseWidth(col.width) || parseWidth(col.minWidth) || 100
        }
      })
      return offsets
    },

    fixedRightOffsets() {
      const offsets = {}
      let offset = 0
      for (let index = this.normalizedColumns.length - 1; index >= 0; index -= 1) {
        const col = this.normalizedColumns[index]
        if (col.fixed === 'right') {
          offsets[index] = offset
          offset += parseWidth(col.width) || parseWidth(col.minWidth) || 100
        }
      }
      return offsets
    },
  },

  created() {
    if (this.defaultSort?.prop) {
      this.sortProp = this.defaultSort.prop
      this.sortOrder = this.defaultSort.order || 'asc'
    }
  },

  methods: {
    getSourceIndex(row) {
      if (this.paginatedSourceIndexMap.has(row)) {
        return this.paginatedSourceIndexMap.get(row)
      }
      return this.sortedData.indexOf(row)
    },

    getRowKey(row, index) {
      if (typeof this.rowKey === 'function') {
        return this.rowKey(row)
      }
      const key = getNestedValue(row, this.rowKey)
      return key ?? index
    },

    isRowSelectable(row, index) {
      if (typeof this.selectable === 'function') {
        return this.selectable(row, index)
      }
      return true
    },

    shouldEllipsis(col) {
      const mode = this.getCellOverflowMode(col)
      return mode === 'ellipsis' || mode === 'both'
    },

    getCellOverflowMode(col) {
      if (col.showOverflowTooltip) return 'both'
      if (col.ellipsis && col.tooltip) return 'both'
      if (col.ellipsis) return 'ellipsis'
      if (col.tooltip) return 'tooltip'
      if (this.showOverflowTooltip) return 'both'
      return 'none'
    },

    shouldUseTooltip(col) {
      const mode = this.getCellOverflowMode(col)
      return mode === 'tooltip' || mode === 'both'
    },

    getCellTooltipContent(col, row, index) {
      if (!this.shouldUseTooltip(col)) return ''
      return String(this.formatCell(row, col, index) ?? '')
    },

    getColStyle(col) {
      const style = {}
      if (col.width) style.width = typeof col.width === 'number' ? `${col.width}px` : col.width
      if (col.minWidth) {
        style.minWidth = typeof col.minWidth === 'number' ? `${col.minWidth}px` : col.minWidth
      }
      return style
    },

    getCellStyle(col, colIndex, isHead = false) {
      const align = isHead ? col.headerAlign : col.align
      const style = { textAlign: align }
      if (col.width) style.width = typeof col.width === 'number' ? `${col.width}px` : col.width
      if (col.minWidth) {
        style.minWidth = typeof col.minWidth === 'number' ? `${col.minWidth}px` : col.minWidth
      }

      if (col.fixed === 'left' && this.fixedLeftOffsets[colIndex] != null) {
        style.left = `${this.fixedLeftOffsets[colIndex]}px`
      }
      if (col.fixed === 'right' && this.fixedRightOffsets[colIndex] != null) {
        style.right = `${this.fixedRightOffsets[colIndex]}px`
      }

      return style
    },

    getHeaderClass(col, colIndex) {
      return [
        'ctable__cell',
        'ctable__cell--head',
        `ctable__cell--${col.headerAlign}`,
        {
          'is-sortable': col.sortable,
          'is-fixed-left': col.fixed === 'left',
          'is-fixed-right': col.fixed === 'right',
        },
        this.getFixedEdgeClass(col, colIndex),
      ]
    },

    getBodyCellClass(col, row, index, colIndex, isSummary = false) {
      const classes = [
        'ctable__cell',
        `ctable__cell--${col.align}`,
        {
          'is-fixed-left': col.fixed === 'left',
          'is-fixed-right': col.fixed === 'right',
          'is-ellipsis': this.shouldEllipsis(col),
          'is-tooltip': this.getCellOverflowMode(col) === 'tooltip',
          'is-overflow-tooltip': this.getCellOverflowMode(col) === 'both',
        },
        this.getFixedEdgeClass(col, colIndex),
      ]

      if (!isSummary && typeof col.className === 'function') {
        const extra = col.className(row, index)
        if (extra) classes.push(extra)
      } else if (!isSummary && col.className) {
        classes.push(col.className)
      }

      return classes
    },

    getFixedEdgeClass(col, colIndex) {
      if (col.fixed === 'left') {
        const next = this.normalizedColumns[colIndex + 1]
        if (!next || next.fixed !== 'left') return 'is-fixed-edge-left'
      }
      if (col.fixed === 'right') {
        const prev = this.normalizedColumns[colIndex - 1]
        if (!prev || prev.fixed !== 'right') return 'is-fixed-edge-right'
      }
      return ''
    },

    getRowClass(row, index) {
      const key = this.getRowKey(row, index)
      const custom =
        typeof this.rowClassName === 'function'
          ? this.rowClassName(row, index)
          : this.rowClassName

      return [
        custom,
        {
          'is-current': this.highlightCurrentRow && this.currentRowKey === key,
          'is-selected': this.selectedKeySet.has(key),
          'is-expanded': this.isRowExpanded(row, index),
          'is-disabled': !this.isRowSelectable(row, index),
          'is-stripe-row': this.stripe && index % 2 === 1,
        },
      ]
    },

    getCellValue(row, col) {
      return getNestedValue(row, col.prop)
    },

    formatCell(row, col, index) {
      const value = this.getCellValue(row, col)
      if (typeof col.formatter === 'function') {
        return col.formatter(row, col, value, index)
      }
      if (value == null || value === '') return '—'
      return value
    },

    onHeaderClick(col) {
      if (!col.sortable || !col.prop) return

      if (this.sortProp !== col.prop) {
        this.sortProp = col.prop
        this.sortOrder = 'asc'
      } else if (this.sortOrder === 'asc') {
        this.sortOrder = 'desc'
      } else if (this.sortOrder === 'desc') {
        this.sortProp = ''
        this.sortOrder = null
      } else {
        this.sortOrder = 'asc'
      }

      this.$emit('sortChange', {
        prop: this.sortProp,
        order: this.sortOrder,
      })
    },

    isRowSelected(row, index) {
      return this.selectedKeySet.has(this.getRowKey(row, index))
    },

    isRowExpanded(row, index) {
      return this.expandKeySet.has(this.getRowKey(row, index))
    },

    toggleRowSelection(row, index, checked) {
      if (!this.isRowSelectable(row, index)) return

      const key = this.getRowKey(row, index)
      const next = new Set(this.selectedKeys)

      if (checked) {
        next.add(key)
      } else {
        next.delete(key)
      }

      const keys = [...next]
      this.$emit('update:selectedKeys', keys)
      this.emitSelectionChange(keys)
    },

    toggleAllSelection(checked) {
      const keys = checked ? this.enabledSelectableRows.map(({ key }) => key) : []
      this.$emit('update:selectedKeys', keys)
      this.emitSelectionChange(keys)
    },

    toggleExpand(row, index) {
      const key = this.getRowKey(row, index)
      const next = new Set(this.expandRowKeys)

      if (next.has(key)) {
        next.delete(key)
      } else {
        next.add(key)
      }

      const keys = [...next]
      this.$emit('update:expandRowKeys', keys)
      this.$emit('expandChange', keys, row)
    },

    emitSelectionChange(keys) {
      const rows = this.data.filter((row, index) => keys.includes(this.getRowKey(row, index)))
      this.$emit('selectionChange', rows, keys)
    },

    onRowClick(row, index) {
      const key = this.getRowKey(row, index)
      if (this.highlightCurrentRow) {
        this.currentRowKey = key
        this.$emit('currentChange', row, key)
      }
      this.$emit('rowClick', row, index)
    },

    goPage(page) {
      const next = Math.min(Math.max(page, 1), this.totalPages)
      if (next === this.currentPage) return
      this.$emit('update:currentPage', next)
      this.$emit('pageChange', next)
    },

    onPageSizeChange(event) {
      const next = Number(event.target.value)
      if (!next || next === this.pageSize) return
      this.$emit('update:pageSize', next)
      this.$emit('pageSizeChange', next)
      if (this.currentPage !== 1) {
        this.$emit('update:currentPage', 1)
        this.$emit('pageChange', 1)
      }
    },
  },
}
</script>

<style scoped>
.ctable-wrap {
  position: relative;
  width: 100%;
  border-radius: var(--radius-md);
  background: var(--card-bg);
  overflow: hidden;
}

.ctable-wrap.is-border {
  border: 1px solid var(--border);
}

.ctable__scroll {
  width: 100%;
  overflow: auto;
}

.ctable {
  width: 100%;
  border-collapse: collapse;
  table-layout: fixed;
}

.ctable__head th,
.ctable__foot td {
  background: var(--surface-elevated);
}

.ctable__head th {
  position: sticky;
  top: 0;
  z-index: 1;
  color: var(--text);
  font-weight: var(--font-weight-semibold);
  border-bottom: 1px solid var(--border);
}

.ctable__foot td {
  font-weight: var(--font-weight-semibold);
  border-top: 1px solid var(--border);
  color: var(--text);
}

.ctable-wrap.is-border .ctable__cell {
  border-right: 1px solid var(--border);
}

.ctable-wrap.is-border .ctable__cell:last-child {
  border-right: none;
}

.ctable-wrap.is-border .ctable__body tr:not(:last-child):not(.ctable__expand-row) .ctable__cell {
  border-bottom: 1px solid var(--border);
}

.ctable__cell {
  padding: 12px 14px;
  text-align: left;
  vertical-align: middle;
  color: var(--text);
  transition: background 0.15s ease;
}

.ctable__cell--center {
  text-align: center;
}

.ctable__cell--right {
  text-align: right;
}

.ctable__cell.is-fixed-left,
.ctable__cell.is-fixed-right {
  position: sticky;
  z-index: 2;
  background: var(--card-bg);
}

.ctable__cell--head.is-fixed-left,
.ctable__cell--head.is-fixed-right {
  z-index: 3;
  background: var(--surface-elevated);
}

.ctable__cell.is-fixed-edge-left {
  box-shadow: 4px 0 8px rgba(0, 0, 0, 0.12);
}

.ctable__cell.is-fixed-edge-right {
  box-shadow: -4px 0 8px rgba(0, 0, 0, 0.12);
}

.ctable__cell--head.is-sortable {
  cursor: pointer;
  user-select: none;
}

.ctable__cell--head.is-sortable:hover {
  background: var(--accent-muted);
}

.ctable__label {
  vertical-align: middle;
}

.ctable__sort {
  display: inline-flex;
  flex-direction: column;
  margin-left: 6px;
  vertical-align: middle;
  line-height: 0.65;
  color: var(--muted);
}

.ctable__sort-icon {
  font-size: 8px;
  opacity: 0.45;
}

.ctable__sort-icon.is-active {
  color: var(--accent);
  opacity: 1;
}

.ctable__ellipsis {
  display: block;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  min-width: 0;
  max-width: 100%;
}

.ctable__cell-text {
  display: block;
  min-width: 0;
  max-width: 100%;
}

.ctable__cell-text--tooltip {
  white-space: normal;
  word-break: break-all;
  overflow: visible;
}

.ctable__cell.is-ellipsis,
.ctable__cell.is-overflow-tooltip {
  overflow: hidden;
  max-width: 0;
}

.ctable__expand-placeholder {
  display: inline-block;
  width: 14px;
}

.ctable__expand-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  border: none;
  background: transparent;
  color: var(--muted);
  cursor: pointer;
  transition: color 0.15s ease;
}

.ctable__expand-btn:hover {
  color: var(--accent);
}

.ctable__expand-icon {
  transition: transform 0.2s ease;
}

.ctable__expand-icon.is-expanded {
  transform: rotate(90deg);
  color: var(--accent);
}

.ctable__expand-row .ctable__expand-cell {
  padding: 10px 14px 14px;
  background: var(--glass);
}

.ctable__body tr:hover .ctable__cell {
  background: var(--glass);
}

.ctable__body tr:hover .ctable__cell.is-fixed-left,
.ctable__body tr:hover .ctable__cell.is-fixed-right {
  background: var(--surface-elevated);
}

.ctable-wrap.is-stripe .ctable__body tr.is-stripe-row .ctable__cell {
  background: rgba(255, 255, 255, 0.02);
}

.ctable-wrap.is-stripe .ctable__body tr.is-stripe-row:hover .ctable__cell {
  background: var(--glass);
}

.ctable-wrap.is-stripe .ctable__body tr.is-current .ctable__cell,
.ctable-wrap.is-stripe .ctable__body tr.is-current:hover .ctable__cell {
  background: var(--accent-muted);
}

.ctable__body tr.is-current .ctable__cell {
  background: var(--accent-muted);
}

.ctable__body tr.is-selected .ctable__cell {
  background: var(--accent-muted);
}

.ctable__body tr.is-selected .ctable__cell:first-child {
  position: relative;
}

.ctable__body tr.is-selected .ctable__cell:first-child::before {
  content: '';
  position: absolute;
  left: 0;
  top: 4px;
  bottom: 4px;
  width: 3px;
  border-radius: 0 2px 2px 0;
  background: linear-gradient(180deg, var(--accent), var(--accent-2));
  box-shadow: 0 0 8px var(--glow-color);
}

.ctable-wrap.is-stripe .ctable__body tr.is-selected .ctable__cell {
  background: var(--accent-muted);
}

.ctable__body tr.is-selected:hover .ctable__cell {
  box-shadow: inset 0 0 0 1px var(--accent-border);
}

.ctable__body tr.is-disabled {
  opacity: 0.55;
}

.ctable__empty {
  padding: 40px 16px;
  text-align: center;
  color: var(--muted);
}

.ctable-wrap--small .ctable__cell {
  padding: 8px 10px;
  font-size: var(--font-size-sm);
}

.ctable-wrap--medium .ctable__cell {
  font-size: var(--font-size-sm);
}

.ctable-wrap--large .ctable__cell {
  padding: 14px 16px;
  font-size: var(--font-size-base);
}

.ctable__loading {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
  background: rgba(15, 20, 25, 0.55);
  backdrop-filter: blur(2px);
  z-index: 4;
}

.ctable__spinner {
  width: 28px;
  height: 28px;
  border: 2px solid var(--border);
  border-top-color: var(--accent);
  border-radius: 50%;
  animation: ctable-spin 0.8s linear infinite;
}

.ctable__loading-text {
  font-size: var(--font-size-sm);
  color: var(--muted);
}

.ctable__pagination {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  padding: 10px 14px;
  border-top: 1px solid var(--border);
  background: var(--surface-elevated);
}

.ctable__pagination-total {
  font-size: var(--font-size-sm);
  color: var(--muted);
}

.ctable__pagination-actions {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.ctable__page-btn {
  padding: 4px 10px;
  border-radius: var(--radius-sm);
  border: 1px solid var(--border);
  background: transparent;
  color: var(--text);
  font-size: var(--font-size-sm);
  cursor: pointer;
  transition:
    border-color 0.15s ease,
    color 0.15s ease,
    background 0.15s ease;
}

.ctable__page-btn:hover:not(:disabled) {
  border-color: var(--accent-border);
  color: var(--accent);
  background: var(--accent-muted);
}

.ctable__page-btn:disabled {
  opacity: 0.45;
  cursor: not-allowed;
}

.ctable__page-info {
  font-size: var(--font-size-sm);
  color: var(--text);
  min-width: 64px;
  text-align: center;
}

.ctable__page-size {
  display: inline-flex;
  align-items: center;
  gap: 6px;
}

.ctable__page-size-label {
  font-size: var(--font-size-sm);
  color: var(--muted);
}

.ctable__page-size-select {
  padding: 4px 8px;
  border-radius: var(--radius-sm);
  border: 1px solid var(--border);
  background: transparent;
  color: var(--text);
  font-size: var(--font-size-sm);
  cursor: pointer;
  transition:
    border-color 0.15s ease,
    color 0.15s ease,
    background 0.15s ease;
}

.ctable__page-size-select:hover {
  border-color: var(--accent-border);
  color: var(--accent);
  background: var(--accent-muted);
}

.ctable__page-size-select:focus {
  outline: none;
  border-color: var(--accent-border);
  box-shadow: 0 0 0 2px var(--accent-muted);
}

@keyframes ctable-spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
