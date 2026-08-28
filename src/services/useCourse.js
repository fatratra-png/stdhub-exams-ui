import {useState, useEffect, useCallback} from "react";
import {apiCourse} from "../api/apiCourse";

const useCourse = () => {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchCourses = useCallback (async () => {
        setLoading (true);
        setError (null);
        try {
            const data = await apiCourse.list();
            setCourses(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading (false);
        }
    }, []);

    useEffect(() => {
        fetchCourses();
    }, [fetchCourses]);

    const createCourse = async (courseData) => {
        await apiCourse.create(courseData);
        await fetchCourses();
    }

    const updateCourse = async (id, courseData) => {
        await apiCourse.update(id, courseData);
        await fetchCourses();
    }

    const deleteCourse = async (id) => {
        await apiCourse.delete(id);
        await fetchCourses();
    }

    return { courses, loading, error, createCourse, updateCourse, deleteCourse }; 
}

export default useCourse;