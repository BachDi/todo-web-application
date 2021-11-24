import { observer } from 'mobx-react'
import { useStores } from 'stores'

const HomePage = () => {
  const { testStore, taskStore } = useStores()
  const { status } = testStore
  const { tasks } = taskStore
  console.log("tasks", tasks)

  function toggleStatus() {
    testStore.toggleStatus()
    taskStore.getTaskList()
  }
  console.log(status)
  return (<div>
    <p>This is HomePage. Status: {status.toString()}</p>
    <button onClick={toggleStatus}>Toggle Status</button>
  </div>)
}

export default observer(HomePage)
