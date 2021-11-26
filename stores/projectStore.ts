import { toast } from 'react-toastify'
import { createProject, getProjectDetail, getProjects } from 'API/project'
import { createProjectUser } from 'API/projectUser'
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
    this.projects = await getProjects({
      where: { isDeleted: { neq: true } },
      include: [
        {
          relation: 'projectUsers',
          scope: {
            include: [{ relation: 'user' }]
          }
        }
      ]
    })
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
  async addUserToProject(projectId: string, userId: string) {
    try {
      await createProjectUser({ projectId, userId })
      this.getList()
      toast.success('Add User successfully')
    } catch (error) {
      console.log(error)
      toast.error('Add User failed')
    }
  }
}

export default ProjectStore
