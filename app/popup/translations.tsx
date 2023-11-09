import React, { useState } from "react"

import {
  createTranslation,
  deleteTranslation,
  updateTranslation
} from "~services/apiService"
import { onChange } from "~services/helpers"

import indexStyle from "./css_modules/index.module.css"
import styles from "./css_modules/translation.module.css"

const translations = ({ nav, info, setInfo }) => {
  const [modal, setModal] = useState({
    new: false,
    update: false,
    delete: false
  })

  const [data, setData] = useState({
    queryLanguage: "",
    queryWord: "",
    translationLanguage: "",
    translationWord: ""
  })

  const [updateData, setUpdateData] = useState({
    queryLanguage: "",
    queryWord: "",
    translationLanguage: "",
    translationWord: ""
  })

  const [deleteData, setDeleteData] = useState({
    queryLanguage: "",
    queryWord: ""
  })

  return (
    <div className={styles.parent}>
      {/* Conditionally Render Create Form */}

      {nav.new ? (
        <form action="" className={styles.form}>
          <h3>Add Translation</h3>
          <div className={styles.translation_container}>
            <div className={styles.container}>
              <select
                name="queryLanguage"
                id="queryLanguage"
                onChange={(e) => onChange(e, data, setData)}>
                <option value="" className="style">
                  Select a Language
                </option>
                <option value="English">English</option>
                <option value="French">French</option>
                <option value="German">German</option>
                <option value="Spanish">Spanish</option>
              </select>
              <input
                type="text"
                name="queryWord"
                id="queryWord"
                onChange={(e) => onChange(e, data, setData)}
                placeholder="Enter Word..."
              />
            </div>
            <div className={styles.container}>
              <select
                name="translationLanguage"
                id="translationLanguage"
                onChange={(e) => onChange(e, data, setData)}>
                <option value="" className="style">
                  Select a Language
                </option>
                <option value="English">English</option>
                <option value="French">French</option>
                <option value="German">German</option>
                <option value="Spanish">Spanish</option>
              </select>
              <input
                type="text"
                onChange={(e) => onChange(e, data, setData)}
                name="translationWord"
                id="translationWord"
                placeholder="Enter Translation..."
              />
            </div>
          </div>
          <button
            type="submit"
            id="add_new"
            className={styles.submit_button}
            onClick={(e) => {
              // Clear info State
              const initial = {
                data: "",
                error: ""
              }
              setInfo(initial)
              //Prevent Page Reload
              e.preventDefault()
              createTranslation(data, setInfo).then(() => {
                const value = { new: true, update: false, delete: false }
                setModal(value)
              })
            }}>
            Add Translation
          </button>
          <div
            className={indexStyle.modal}
            style={
              modal.new
                ? {
                    bottom: "0"
                  }
                : {}
            }>
            <p
              className={styles.close}
              onClick={() => {
                const value = { new: false, update: false, delete: false }
                setModal(value)
              }}>
              &times;
            </p>
            {info.error ? (
              <p id="error_message">{info.error}</p>
            ) : (
              <p id="success_message">{info.data}</p>
            )}
          </div>
        </form>
      ) : null}

      {/* Conditionally Render Update Form */}

      {nav.update ? (
        <form action="" className={styles.form}>
          <h3>Update Word</h3>
          <div className={styles.translation_container}>
            <div className={styles.container}>
              <select
                name="queryLanguage"
                id="language"
                onChange={(e) => onChange(e, updateData, setUpdateData)}>
                <option value="" className="style">
                  Select a Language
                </option>
                <option value="English">English</option>
                <option value="French">French</option>
                <option value="German">German</option>
                <option value="Spanish">Spanish</option>
              </select>
              <input
                type="text"
                name="queryWord"
                onChange={(e) => onChange(e, updateData, setUpdateData)}
                placeholder="Enter Word..."
                className={styles.update_word}
              />
            </div>
            <div className={styles.container}>
              <select
                name="translationLanguage"
                id="language"
                onChange={(e) => onChange(e, updateData, setUpdateData)}>
                <option value="" className="style">
                  Select a Language
                </option>
                <option value="English">English</option>
                <option value="French">French</option>
                <option value="German">German</option>
                <option value="Spanish">Spanish</option>
              </select>
              <input
                type="text"
                name="translationWord"
                onChange={(e) => onChange(e, updateData, setUpdateData)}
                placeholder="Enter Translation"
              />
            </div>
          </div>
          <button
            type="submit"
            id="update_button"
            className={styles.submit_button}
            onClick={(e) => {
              // Clear info State
              const initial = {
                data: "",
                error: ""
              }
              setInfo(initial)
              //Prevent Page Reload
              e.preventDefault()
              // Update Translation
              updateTranslation(updateData, setInfo).then(() => {
                const value = { new: false, update: true, delete: false }
                setModal(value)
              })
            }}>
            Update Translation
          </button>
          <div
            className={indexStyle.modal}
            style={
              modal.update
                ? {
                    bottom: "0"
                  }
                : {}
            }>
            <p
              className={styles.close}
              onClick={() => {
                const value = { new: false, update: false, delete: false }
                setModal(value)
              }}>
              &times;
            </p>
            {info.error ? (
              <p id="error_message">{info.error}</p>
            ) : (
              <p id="success_message">{info.data}</p>
            )}
          </div>
        </form>
      ) : null}

      {/* Conditionally Render Delete Form */}

      {nav.delete ? (
        <form action="" className={styles.form}>
          <h3>Delete Translation</h3>
          <div className={styles.translation_container}>
            <div className={styles.container}>
              <select
                name="queryLanguage"
                id="language"
                onChange={(e) => onChange(e, deleteData, setDeleteData)}>
                <option value="" className="style">
                  Select a Language
                </option>
                <option value="English">English</option>
                <option value="French">French</option>
                <option value="German">German</option>
                <option value="Spanish">Spanish</option>
              </select>
              <input
                type="text"
                name="queryWord"
                onChange={(e) => onChange(e, deleteData, setDeleteData)}
                placeholder="Enter Word..."
              />
            </div>
          </div>
          <button
            type="submit"
            id="delete_button"
            className={styles.submit_button}
            onClick={(e) => {
              // Clear info State
              const initial = {
                data: "",
                error: ""
              }
              setInfo(initial)
              //Prevent Page Reload
              e.preventDefault()
              deleteTranslation(deleteData, setInfo).then(() => {
                const value = { new: false, update: false, delete: true }
                setModal(value)
              })
            }}>
            Delete
          </button>
          <div
            className={indexStyle.modal}
            style={
              modal.delete
                ? {
                    bottom: "0"
                  }
                : {}
            }>
            <p
              className={styles.close}
              onClick={() => {
                const value = { new: false, update: false, delete: false }
                setModal(value)
              }}>
              &times;
            </p>
            {info.error ? (
              <p id="error_message">{info.error}</p>
            ) : (
              <p id="success_message">{info.data}</p>
            )}
          </div>
        </form>
      ) : null}
    </div>
  )
}

export default translations
