
import ReactDOM from 'react-dom/client'
import { EditorProvider } from './components/EditorProvider'
import { Stage } from './containers/Stage'
import './css/base.css'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
	<EditorProvider>
		<Stage />
	</EditorProvider>
)
