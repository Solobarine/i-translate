import { type ChangeEvent, type Dispatch } from "react"

export const onChange = (
  e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>,
  state: {
    queryWord: string
    queryLanguage: string
    translationLanguage?: string
    translationWord?: string
  },
  setState: Dispatch<
    React.SetStateAction<{
      queryWord: string
      queryLanguage: string
    }>
  >
) => {
  e.preventDefault()
  setState(() => ({ ...state, [e.target.name]: e.target.value }))
  console.log(state)
}
