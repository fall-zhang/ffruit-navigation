// 初始化数据库
const initDB = () => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open('ImageStorageDB', 1)

    request.onupgradeneeded = (event:IDBVersionChangeEvent) => {
      console.log('event', event)
      const db = event.target.result
      if (!db.objectStoreNames.contains('images')) {
        db.createObjectStore('images', { keyPath: 'id' })
      }
    }

    request.onsuccess = (event) => resolve(event.target.result)
    request.onerror = (event) => reject(event.target.error)
  })
}

// 保存图片到IndexedDB
const saveImageToDB = async (imageData:Blob) => {
  const db = await initDB()
  const transaction = db.transaction('images', 'readwrite')
  const store = transaction.objectStore('images')

  store.put({
    id: 'user-background-image',
    data: imageData,
    timestamp: new Date().getTime()
  })
}

/**
 * 从 IndexedDB 读取图片
 */
const loadImageFromDB = async () => {
  const db = await initDB()
  return new Promise((resolve, reject) => {
    const transaction = db.transaction('images', 'readonly')
    const store = transaction.objectStore('images')
    const request = store.get('user-background-image')

    request.onsuccess = (e) => resolve(e.target.result?.data)
    request.onerror = (e) => reject(e.target.error)
  })
}

// 处理文件上传
document.getElementById('imageUpload').addEventListener('change', async (e) => {
  const file = e.target.files[0]
  if (!file) return

  // 转换为Base64格式
  const reader = new FileReader()
  reader.onload = async (event) => {
    const imageData = event.target.result
    await saveImageToDB(imageData)
    document.getElementById('preview').src = imageData
  }
  reader.readAsDataURL(file)
})

// 页面加载时读取图片
window.addEventListener('DOMContentLoaded', async () => {
  const imageData = await loadImageFromDB()
  if (imageData) {
    document.getElementById('preview').src = imageData
  }
})
