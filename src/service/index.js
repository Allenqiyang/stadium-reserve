import service from "./request"

export const createUser = (username, password) => {
  return service.request({
    url: '/users',
    method: 'post',
    data: {
      username,
      password
    }
  })
}

export const login = (username, password) => {
  return service.request({
    url: '/login',
    method: 'post',
    data: {
      username,
      password
    }
  })
}

export const verifyToken = () => {
  return service.request({
    url: '/test',
    method: 'get'
  })
}

export const getUserInfo = (userId) => {
  return service.request({
    url: `/users/${userId}`,
    method: 'get'
  })
}

export const updateUserName = (newName) => {
  return service.request({
    url: '/users/update',
    method: 'post',
    data: {
      newName
    }
  })
}

export const reserve = (courtId, date, period) => {
  return service.request({
    url: '/reserve',
    method: 'post',
    data: {
      courtId,
      date,
      period
    }
  })
}

export const cancel = (courtId, date, period) => {
  return service.request({
    url: '/reserve/cancel',
    method: 'post',
    data: {
      courtId,
      date,
      period
    }
  })
}

export const getStadiumStatus = (courtId, date) => {
  return service.request({
    url: `/reserve?courtId=${courtId}&date=${date}`,
    method: 'get'
  })
}

export const publishMoment = (momentContent) => {
  return service.request({
    url: '/moment',
    method: 'post',
    data: {
      content: momentContent
    }
  })
}

export const uploadImage = (data, momentId) => {
  return service.request({
    url: `/upload/picture/?momentId=${momentId}`,
    method: 'post',
    data
  })
}

export const uploadAvatar = (data) => {
  return service.request({
    url: `/upload/avatar`,
    method: 'post',
    data
  })
}

export const getMomentList = (offset, size) => {
  return service.request({
    url: `/moment?offset=${offset}&size=${size}`,
    method: 'get'
  })
}

export const getMomentCount = () => {
  return service.request({
    url: '/moment/count',
    method: 'get'
  })
}

export const getMomentDetail = (momentId) => {
  return service.request({
    url: `/moment/${momentId}`,
    method: 'get'
  })
}

export const updateMoment = (momentId, updateContent) => {
  return service.request({
    url: `/moment/${momentId}`,
    method: 'patch',
    data: {
      content: updateContent
    }
  })
}

export const deleteMoment = (momentId) => {
  return service.request({
    url: `/moment/${momentId}`,
    method: 'delete'
  })
}

export const writeComment = (momentId, commentContent) => {
  return service.request({
    url: '/comment',
    method: 'post',
    data: {
      momentId,
      content: commentContent
    }
  })
}

export const getComment = (momentId) => {
  return service.request({
    url: `/comment?momentId=${momentId}`,
    method: 'get'
  })
}
