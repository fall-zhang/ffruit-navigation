import fs, { promises as fsPromises } from 'fs'
import path from 'path'
import csv from 'csv-parser'
import { XMLParser, XMLBuilder, XMLValidator } from 'fast-xml-parser'
import yaml from 'js-yaml'


// 3. Promise 方式读取文件
async function readFilePromiseExample() {
  try {
    const data = await fsPromises.readFile('example.txt', 'utf8')
    console.log('Promise 读取内容:', data.slice(0, 50) + '...')
    return data
  } catch (err) {
    console.error('Promise 读取错误:', err)
  }
}

// 4. 流式读取文件（适合大文件）
function streamReadExample() {
  const readStream = fs.createReadStream('example.txt', 'utf8')
  let content = ''

  readStream.on('data', (chunk) => {
    content += chunk
  })

  readStream.on('end', () => {
    console.log('流式读取完成，内容长度:', content.length)
  })

  readStream.on('error', (err) => {
    console.error('流式读取错误:', err)
  })
}

// 5. 解析JSON文件
async function parseJsonFile() {
  try {
    const data = await fsPromises.readFile('data.json', 'utf8')
    const json = JSON.parse(data)
    console.log('JSON解析结果:', json)
    return json
  } catch (err) {
    console.error('JSON解析错误:', err)
  }
}

// 6. 解析CSV文件
function parseCsvFile() {
  const results = []
  fs.createReadStream('data.csv')
    .pipe(csv())
    .on('data', (data) => results.push(data))
    .on('end', () => {
      console.log('CSV 解析结果:', results)
    })
    .on('error', (err) => {
      console.error('CSV 解析错误:', err)
    })
}

// 7. 解析XML文件

function parseXmlFile() {
  fs.readFile('data.xml', 'utf8', (err, data) => {
    if (err) throw err
    const parser = new XMLParser()
    const jObj = parser.parse(data)
    console.log('jObj', jObj)
  })
}

// 8. 解析YAML文件
async function parseYamlFile() {
  try {
    const fileContents = await fsPromises.readFile('config.yaml', 'utf8')
    const data = yaml.load(fileContents)
    console.log('YAML解析结果:', data)
    return data
  } catch (err) {
    console.error('YAML解析错误:', err)
  }
}

// 9. 解析文本文件（自定义格式）
function parseCustomTextFile() {
  fs.readFile('custom.txt', 'utf8', (err, data) => {
    if (err) throw err

    // 自定义解析逻辑 - 示例：键值对解析
    const result = {}
    data.split('\n').forEach(line => {
      const [key, value] = line.split('=')
      if (key && value) {
        result[key.trim()] = value.trim()
      }
    })

    console.log('自定义文本解析结果:', result)
  })
}

// 10. 文件写入示例
async function writeFileExample() {
  try {
    const content = '这是新写入的内容\n第二行内容'
    await fsPromises.writeFile('output.txt', content)
    console.log('文件写入成功')
  } catch (err) {
    console.error('文件写入错误:', err)
  }
}

// 创建示例文件
async function createExampleFiles() {
  // 创建文本文件
  await fsPromises.writeFile('example.txt',
    '这是一个示例文本文件\n包含多行内容\n用于演示Node.js文件操作')

  // 创建JSON文件
  await fsPromises.writeFile('data.json',
    JSON.stringify([
      { id: 1, name: 'Alice', age: 30 },
      { id: 2, name: 'Bob', age: 25 },
      { id: 3, name: 'Charlie', age: 35 }
    ], null, 2))

  // 创建CSV文件
  await fsPromises.writeFile('data.csv',
    'id,name,age\n1,Alice,30\n2,Bob,25\n3,Charlie,35')

  // 创建XML文件
  await fsPromises.writeFile('data.xml',
    '<root><person><id>1</id><name>Alice</name><age>30</age></person></root>')

  // 创建YAML文件
  await fsPromises.writeFile('config.yaml',
    'app:\n  name: "My App"\n  version: 1.0.0\nsettings:\n  debug: false')

  // 创建自定义文本文件
  await fsPromises.writeFile('custom.txt',
    'name=John Doe\nemail=johndoe@example.com\nrole=admin')

  console.log('示例文件创建完成')
}

// 运行所有示例
async function runAllExamples() {
  await createExampleFiles()

  console.log('\n=== Promise读取示例 ===')
  await readFilePromiseExample()

  console.log('\n=== 流式读取示例 ===')
  streamReadExample()

  // 等待流式读取完成
  await new Promise(resolve => setTimeout(resolve, 500))

  console.log('\n=== JSON解析示例 ===')
  await parseJsonFile()

  console.log('\n=== CSV解析示例 ===')
  parseCsvFile()

  // 等待CSV解析完成
  await new Promise(resolve => setTimeout(resolve, 500))

  console.log('\n=== XML解析示例 ===')
  parseXmlFile()

  // 等待XML解析完成
  await new Promise(resolve => setTimeout(resolve, 500))

  console.log('\n=== YAML解析示例 ===')
  await parseYamlFile()

  console.log('\n=== 自定义文本解析示例 ===')
  parseCustomTextFile()

  // 等待自定义解析完成
  await new Promise(resolve => setTimeout(resolve, 500))

  console.log('\n=== 文件写入示例 ===')
  await writeFileExample()

  console.log('\n=== 所有示例完成 ===')
}

// 执行主函数
runAllExamples().catch(console.error)
