import React,{useEffect, useState} from 'react'
import appwriteService from '../appwrite/config'
import { useNavigate, useParams } from 'react-router'
import { Container } from '../components';
import PostForm from '../components/post-form/PostForm';

function EditPost() {
    const [post, setPosts] = useState(null);
    const navigate = useNavigate()
    const {slug}= useParams();
    useEffect(()=>{
        if(slug){

            appwriteService.getPost(slug).then((post)=>{
                if(post){
                    setPosts(post)
                }
            })
        }else{
            navigate("/")
        }
    },[slug, navigate])
  return post ? (
    <div className='py-8'>
        <Container>
            <PostForm post={post}/>
        </Container>
    </div>
  ) : null
}

export default EditPost
