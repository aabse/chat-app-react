import { render } from "@testing-library/react"
import App from "../App.jsx"
test('demo', () => {
        expect(true).toBe(true)
})

test('Renders the main page', () => {
        const component = render(<App />)
        component.debug()
})
