import React, { useEffect } from 'react'
import $ from './loding.module.scss'
import LoadingImg from '/Spinner.gif'
import { useNavigate } from 'react-router-dom'

const Loading = ({go}: {go: string}) => {
  const navigate = useNavigate()

  const goLink = (path: string) => {
    navigate(path)
  }

  useEffect(() => {
    setTimeout(() => {
      console.log(go)
      goLink(go)
    }, 200)
  }, [])

  return (
    <div className={$.loading_container}>
      <img src={LoadingImg} alt="로딩 중" />
    </div>
  )
}

export default Loading