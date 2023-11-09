import React, { useState } from "react"

import { getTranslation } from "~services/apiService"
import { onChange } from "~services/helpers"

import Translations from "./translations"

import "./css_modules/global.css"

import styles from "./css_modules/index.module.css"

function IndexPopup() {
  const [nav, setNav] = useState({
    home: true,
    new: false,
    update: false,
    delete: false
  })

  const [info, setInfo] = useState({
    data: "",
    error: ""
  })

  const [modal, setModal] = useState(false)

  const [data, setData] = useState({
    queryWord: "",
    queryLanguage: "",
    translationLanguage: ""
  })

  console.log(data)

  return (
    <div className={`popup ${styles.main}`}>
      <nav className={styles.nav}>
        <h2 className={styles.title}>i-Translate</h2>
        <button
          id="home_link"
          type="submit"
          style={nav.home ? { backgroundColor: "var(--secondary)" } : {}}
          onClick={(e) => {
            const values = {
              home: true,
              new: false,
              update: false,
              delete: false
            }
            setModal(false)
            setNav(values)
            console.log(e)
          }}>
          Home
        </button>
        <button
          type="submit"
          id="new_link"
          style={nav.new ? { backgroundColor: "var(--secondary)" } : {}}
          onClick={(e) => {
            const values = {
              home: false,
              new: true,
              update: false,
              delete: false
            }

            setNav(values)
            setModal(false)
            console.log(e)
          }}>
          New
        </button>
        <button
          type="submit"
          id="update_link"
          style={nav.update ? { backgroundColor: "var(--secondary)" } : {}}
          onClick={(e) => {
            const values = {
              home: false,
              new: false,
              update: true,
              delete: false
            }
            setModal(false)
            setNav(values)
            console.log(e)
          }}>
          Update
        </button>
        <button
          type="submit"
          id="delete_link"
          style={
            nav.delete
              ? { backgroundColor: "var(--danger)", color: "var(--light)" }
              : {}
          }
          onClick={(e) => {
            const values = {
              home: false,
              new: false,
              update: false,
              delete: true
            }
            setModal(false)
            setNav(values)
            console.log(e)
          }}>
          Delete
        </button>
      </nav>
      {nav.home ? (
        <form action="#" className={styles.form}>
          <h3>Get a Translation</h3>
          <div className={styles.content}>
            <div className={styles.container}>
              <select
                name="queryLanguage"
                id="languages"
                onChange={(e) => onChange(e, data, setData)}
                value={data.queryLanguage}
                className={styles.field}>
                <option value="" className={styles.option}>
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
                id="word"
                className={styles.field}
                onChange={(e) => onChange(e, data, setData)}
                placeholder="Type or Paste Word"
              />
            </div>
            <p className={styles.to}>to</p>
            <div className={styles.container}>
              <label htmlFor="language">Select Language</label>
              <select
                name="translationLanguage"
                id="languages"
                onChange={(e) => onChange(e, data, setData)}
                value={data.translationLanguage}
                className={styles.field}>
                <option value="" className={styles.option}>
                  Select a Language
                </option>
                <option value="English">English</option>
                <option value="French">French</option>
                <option value="German">German</option>
                <option value="Spanish">Spanish</option>
              </select>
            </div>
          </div>
          <button
            type="submit"
            className={styles.submit_button}
            onClick={async (e) => {
              e.preventDefault()

              const res = await getTranslation(
                data.queryLanguage,
                data.queryWord,
                data.translationLanguage,
                setInfo
              ).then(() => setModal(true))

              console.log(info)
            }}>
            Translate
          </button>
          <div
            className={styles.modal}
            style={
              modal
                ? {
                    bottom: "0"
                  }
                : {}
            }>
            <p className={styles.close} onClick={() => setModal(false)}>
              &times;
            </p>
            {info.error ? (
              <p id="error_message">{info.error}</p>
            ) : (
              <p id="success_message">
                "{data.queryWord}" in {data.translationLanguage} is "{info.data}
                "
              </p>
            )}
          </div>
        </form>
      ) : null}
      {!nav.home ? (
        <div>
          <Translations nav={nav} info={info} setInfo={setInfo} />
        </div>
      ) : null}
    </div>
  )
}

export default IndexPopup
