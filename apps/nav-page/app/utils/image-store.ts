// 初始化数据库
const initDB = () => {
  return new Promise<IDBDatabase>((resolve, reject) => {
    const request = indexedDB.open('ImageStorageDB', 1)

    request.onupgradeneeded = (event:IDBVersionChangeEvent) => {
      const db = (event.target as IDBOpenDBRequest).result
      if (!db.objectStoreNames.contains('images')) {
        db.createObjectStore('images', { keyPath: 'id' })
      }
    }

    request.onsuccess = (event) => resolve((event.target as IDBOpenDBRequest).result)
    request.onerror = (event) => reject((event.target as any)?.error)
  })
}

// 保存图片到IndexedDB
export const saveImageToDB = async (imageData:Blob) => {
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
export const loadImageFromDB = async ():Promise<Blob> => {
  const db = await initDB()
  return new Promise<Blob>((resolve, reject) => {
    const transaction = db.transaction('images', 'readonly')
    const store = transaction.objectStore('images')
    const request = store.get('user-background-image')

    request.onsuccess = (e) => {
      resolve((e.target as IDBRequest).result?.data)
    }
    request.onerror = (e) => reject((e.target as any).error)
  })
}

