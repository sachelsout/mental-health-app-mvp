export interface CampusOption {
  id: string;
  name: string;
}

export const CAMPUSES: CampusOption[] = [
  { id: 'campus_umd', name: 'University of Maryland-College Park' },
  { id: 'campus_umbc', name: 'University of Maryland-Baltimore County' },
  { id: 'campus_gt', name: 'Georgia Tech' },
];

// Get campus name from ID
export function getCampusNameById(campusId: string): string {
  const campus = CAMPUSES.find(c => c.id === campusId);
  return campus ? campus.name : campusId;
}

// Get campus ID from name
export function getCampusIdByName(campusName: string): string {
  const campus = CAMPUSES.find(c => c.name === campusName);
  return campus ? campus.id : campusName;
}