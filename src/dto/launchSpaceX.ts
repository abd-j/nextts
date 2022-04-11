export interface Link {
  article: string | null
  video: string
}

export interface LaunchSpaceX {
  mission_name: string
  details: string | null
  link: Link | null
  date: number
}
