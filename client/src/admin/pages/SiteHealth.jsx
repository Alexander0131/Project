import React, { useEffect, useState } from 'react'
import SideBar from '../components/SideBar'
import Menu from '../components/Menu'
import axios from 'axios'
import { fetchData, fetchStatic } from '../../postDb';
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css"
import { useLocation } from 'react-router-dom';
import { apiUrl } from '../../config';

function SiteHealth() {
    
}

export default SiteHealth