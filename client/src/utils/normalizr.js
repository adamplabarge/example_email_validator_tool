import { normalize, schema } from 'normalizr'

const report = new schema.Entity('reports')
const reportsSchema = { elements: [report] }
const normalizedReports = (data) => normalize(data, reportsSchema)

export const normalizedReportsData = (data) => {
  const {
    entities: {
      reports
    }
  } = normalizedReports(data)
  
  return reports 
}