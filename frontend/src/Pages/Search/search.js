import "./search.css"
import { useResetComponent } from '../../hoock/useResetcomponent'
import { useQuerySearch } from "../../hoock/useQuery"

import Like from '../../Component/likeContainer'
import PhotoItem from '../../Component/photoItem'

import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import {Link} from 'react-router-dom'


const SearchDates = () => {
     const {search} = useQuerySearch()  

    return ( <div>
         <h2>Search here</h2>

    </div> )
}


export default SearchDates