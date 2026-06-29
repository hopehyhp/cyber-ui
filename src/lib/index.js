import CButton from './components/CButton.vue'
import CInput from './components/CInput.vue'
import CSelect from './components/CSelect.vue'
import CSwitch from './components/CSwitch.vue'
import CCheckbox from './components/CCheckbox.vue'
import CTable from './components/CTable.vue'
import CTag from './components/CTag.vue'
import CProgress from './components/CProgress.vue'
import CIcon from './components/CIcon.vue'
import CTooltip from './components/CTooltip.vue'
import { icons, getIcon, registerIcon } from './icons'

const components = [CButton, CInput, CSelect, CSwitch, CCheckbox, CTable, CTag, CProgress, CIcon, CTooltip]

export function install(app) {
  components.forEach((component) => {
    if (component.name) {
      app.component(component.name, component)
    }
  })
}

export {
  CButton,
  CInput,
  CSelect,
  CSwitch,
  CCheckbox,
  CTable,
  CTag,
  CProgress,
  CIcon,
  CTooltip,
  icons,
  getIcon,
  registerIcon,
}

export default { install }
