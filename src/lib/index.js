import CButton from './components/CButton.vue'
import CInput from './components/CInput.vue'
import CIcon from './components/CIcon.vue'
import { icons, getIcon, registerIcon } from './icons'

const components = [CButton, CInput, CIcon]

export function install(app) {
  components.forEach((component) => {
    if (component.name) {
      app.component(component.name, component)
    }
  })
}

export { CButton, CInput, CIcon, icons, getIcon, registerIcon }

export default { install }
