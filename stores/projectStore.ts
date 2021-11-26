import { createProject, getProjectDetail, getProjects } from 'API/project'
import { IProject } from 'interfaces/project'
import { makeAutoObservable } from 'mobx'
import { RootStore } from 'stores'

class ProjectStore {
  rootStore: RootStore
  constructor(rootStore: RootStore) {
    this.rootStore = rootStore
    makeAutoObservable(this)
  }

  projects: IProject[] = []
  projectDetail: IProject = {}

  async getList() {
    this.projects = await getProjects()
  }

  async getDetail(id: string) {
    this.projectDetail = await getProjectDetail(id)
  }

  async addProject(project: IProject) {
    try {
      const result = await createProject(project)
      this.projects = [...this.projects, result]
    } catch (error) {
      console.log(error)
    }
  }
}

export default ProjectStore
