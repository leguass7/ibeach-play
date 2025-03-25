import { apiService } from '@/services/api/api.service'
import type { IEnrollmentResponse, FormEnrollmentData } from '@/services/api/enrollment'

export function paginateEnrollment(): Promise<IEnrollmentResponse | null> {
  return apiService.get('/admin/enrollment')
}

// Add a new person
export function createEnrollment(data: FormEnrollmentData): Promise<IEnrollmentResponse | null> {
  return apiService.post('/admin/enrollment', data)
}

// Update an existing person
export function updateEnrollment(id: string, data: FormEnrollmentData): Promise<IEnrollmentResponse | null> {
  return apiService.patch(`/admin/enrollment/${id}`, data)
}

// Delete a person
export function deleteEnrollment(id: string): Promise<IEnrollmentResponse | null> {
  return apiService.delete(`/admin/enrollment/${id}`)
}

// Import multiple people
export function importEnrollemnt(data: FormEnrollmentData[]): Promise<IEnrollmentResponse | null> {
  return apiService.post('/admin/enrollment/import', { enrollment: data })
}
