import {useState, useEffect, useCallback} from "react";
import {apiStudent} from "../api/apiStudent";

const useStudent = () => {
    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchStudents = useCallback (async () => {
        setLoading (true);
        setError (null);
        try {
            const data = await apiStudent.list();
            setStudents(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading (false);
        }
    }, []);

    useEffect(() => {
        fetchStudents();
    }, [fetchStudents]);

    const createStudent = async (studentData) => {
        await apiStudent.create(studentData);
        await fetchStudents();
    }

    const updateStudent = async (id, studentData) => {
        await apiStudent.update(id, studentData);
        await fetchStudents();
    }

    const deactivateStudent = async (id) => {
        await apiStudent.deactivate(id);
        await fetchStudents();
    }

    return { students, loading, error, createStudent, updateStudent, deactivateStudent }; 
}

export default useStudent;