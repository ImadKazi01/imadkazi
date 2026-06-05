import caseStudies from './case-studies.js'
import workOrder from './work.json'

export function getWorkProjects() {
  return workOrder
    .map((id) => {
      const study = caseStudies.find((cs) => cs.id === id)
      if (!study) return null

      return {
        id: study.id,
        title: study.title,
        desc: study.overview,
        img: study.heroImage,
        link: study.link,
        services: study.services,
        technologies: study.technologies
      }
    })
    .filter(Boolean)
}

export default getWorkProjects()
