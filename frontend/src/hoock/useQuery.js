import { useLocation } from 'react-router-dom'
import { useMemo } from 'react'

export const useQuerySearch = () => {
    const {search} = useLocation()

    return useMemo(() => new URLSearchParams(search),[search] )
}