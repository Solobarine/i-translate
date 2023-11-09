import { type Dispatch } from "react"

import axios from "~axiosMod"
import type { Translation } from "~interface/interface"

export const getTranslation = async (
  queryLanguage: string,
  queryWord: string,
  translationLanguage: string,
  setState: Dispatch<
    React.SetStateAction<{
      data: any
      error: any
    }>
  >
) => {
  await axios
    .get(
      `?queryLanguage=${queryLanguage}&queryWord=${queryWord}&translationLanguage=${translationLanguage}`
    )
    .then((res) => {
      return setState(res.data)
    })
    .catch((error) => {
      return setState(error.response.data)
    })
}

export const createTranslation = async (
  data: Translation,
  setState: Dispatch<
    React.SetStateAction<{
      data: any
      error: any
    }>
  >
) => {
  await axios
    .post("/", data)
    .then((res) => {
      return setState(res.data)
    })
    .catch((error) => {
      return setState(error.response.data)
    })
}

export const updateTranslation = async (
  data: Translation,
  setState: Dispatch<
    React.SetStateAction<{
      data: any
      error: any
    }>
  >
) => {
  await axios
    .patch("/", data)
    .then((res) => {
      console.log(res)

      return setState(res.data)
    })
    .catch((error) => {
      return setState(error.response.data)
    })
}

export const deleteTranslation = async (
  data: Translation,
  setState: Dispatch<
    React.SetStateAction<{
      data: any
      error: any
    }>
  >
) => {
  await axios
    .delete("/", { data })
    .then((res) => {
      return setState(res.data)
    })
    .catch((error) => {
      return setState(error.response.data)
    })
}
