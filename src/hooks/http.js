import { useState, useEffect } from "react"
import axios from "axios"

const headers = {
    "Access-Control-Allow-Origin": "*",
}

export const useHttpGet = (url, dependencies) => {
    const [isLoading, setIsLoading] = useState(false)
    const [fetchedData, setFetchedData] = useState(null)

    useEffect(() => {
        setIsLoading(true)
        console.log("Sending Http request to URL: " + url)
        axios.get("http://localhost:8080/" + url, headers)
            .then((response) => {
                console.log(response)
                if (!response.status===200) {
                    throw new Error("Failed to fetch.")
                }
                return response
            })
            .then((data) => {
                setIsLoading(false)
                setFetchedData(data)
            })
            .catch((err) => {
                console.log(err)
                setIsLoading(false)
            })
    }, dependencies)

    return [isLoading, fetchedData]
}

export const useHttpPost = (url, dependencies, obj) => {
    const [isLoading, setIsLoading] = useState(false)
    const [fetchedData, setFetchedData] = useState(null)

    useEffect(() => {
        setIsLoading(true)
        console.log("Sending Http request to URL: " + url)
        axios.post("http://localhost:8080/" + url, obj, headers)
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Failed to fetch.")
                }
                return response.json()
            })
            .then((data) => {
                setIsLoading(false)
                setFetchedData(data)
            })
            .catch((err) => {
                console.log(err)
                setIsLoading(false)
            })
    }, dependencies)

    return [isLoading, fetchedData]
}