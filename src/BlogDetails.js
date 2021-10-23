
import React from 'react'
import { useHistory, useParams } from 'react-router'
import useFetch from './useFetch';

const BlogDetails = () => {

    //receiving the parameter 
    const { id } = useParams();

    //fetching the exact blog using the id parameter
    const { data: blog, error, isLoaded } = useFetch('http://localhost:8000/blogs/' + id);

    const history = useHistory();

    const handleDelete = () => {
        fetch('http://localhost:8000/blogs/' + blog.id, {
            method: 'DELETE'
        }).then(()=> {
            history.push('/');

        })
    }

    return (
        <div className="blog-details">
            {error && <div> {error} </div>}
            {!isLoaded && <div>Loading...</div>}

            { blog && (
                <article>
                    <h2>{ blog.title }</h2>
                    <p>Written by { blog.author} </p>
                    <div> { blog.body} </div>
                    <button onClick={handleDelete}>Delete Blog</button>
                </article>
            ) }
             
        </div>
    )
}

export default BlogDetails


