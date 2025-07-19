import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

export default function UpdateProblem() {
    const navigate = useNavigate();
    const params = useParams();
    const {currentUser} = useSelector((state) => state.user);
    console.log('Params:', params);
    console.log('Problem ID:', params.problemId);
    const [formData,setFormData] = useState({
        title : "",
        description : "",
        sampleInput : "",
        sampleOutput : "",
        difficulty : "",
        category : "",
    });
    const [error,setError] = useState(null);
    const [loading,setLoading] = useState(false);

    useEffect(()=>{
        if (!params.problemId) {
            setError('Problem ID is missing');
            return;
        }
        
        const fetchProblem = async () => {
            try {
                const res = await fetch(`/api/problem/get/${params.problemId}`);
                const data = await res.json();
                
                
                if(data.success === false){
                    setError(data.message);
                    return;
                }
                
                if(data.problem){
                    setFormData(data.problem);
                } else {
                    setError('Problem not found');
                }
            } catch (error) {
                setError(error.message);
            }
        }
        fetchProblem();
    },[params.problemId])

    const handleChange = (e) => {
        setFormData({...formData,[e.target.id]:e.target.value});
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            setError(null);
            const res = await fetch(`/api/problem/update/${params.problemId}`,{
                method: "POST",
                headers:{
                    "Content-Type":"application/json",
                },
                body: JSON.stringify(formData),
            });
            const data = await res.json();
            setLoading(false);
            
            if(data.success === false){
                setError(data.message);
                return;
            }
            
            // Navigate back to the problem page using the current problemId
            navigate(`/problem/${params.problemId}`);
        } catch (error) {
            setError(error.message);
            setLoading(false);
        }
    };
  return (
    <main>
      <h1 className="text-3xl font-semibold text-center my-7">
        Edit your problem
      </h1>
      <form onSubmit={handleSubmit} className="flex flex-col mx-auto max-w-lg gap-5 ">
        {error && <p className="text-red-700 text-sm">{error}</p>}
        <input
          type="text"
          placeholder="Title"
          className="p-3 rounded-lg border"
          id="title"
          required
          onChange={handleChange}
          value={formData.title}
        />
        <textarea
          className="p-3 rounded-lg border h-32"
          rows={1} // ensures it's a single row, but can wrap
          placeholder="Describe your problem..."
          id="description"
          required
          onChange={handleChange}
          value={formData.description}
        />
        <textarea
          className="p-3 rounded-lg border h-32"
          rows={1} // ensures it's a single row, but can wrap
          placeholder="Sample input..."
          id="sampleInput"
          required
          onChange={handleChange}
          value={formData.sampleInput}
        />
        <textarea
          className="p-3 rounded-lg border h-32"
          rows={1} // ensures it's a single row, but can wrap
          placeholder="Sample output..."
          id="sampleOutput"
          required
          onChange={handleChange}
          value={formData.sampleOutput}
        />
        <input
          type="text"
          placeholder="Category"
          className="p-3 rounded-lg border"
          id="category"
          required
          onChange={handleChange}
          value={formData.category}
        />
        <input
          type="text"
          placeholder="Difficulty"
          className="p-3 rounded-lg border"
          id="difficulty"
          required
          onChange={handleChange}
          value={formData.difficulty}
        />
        <button disabled={loading} className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95">
          {loading ? "Updating..." : "Update Problem"}
        </button>
      </form>
    </main>
  );
}
