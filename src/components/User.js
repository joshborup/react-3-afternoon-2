import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import BlogTile from './subcomponents/BlogTile';
import axios from 'axios';
// import axios

class User extends Component{
    constructor(){
        super()

        this.state={
            user: {},
            posts: []
        }
    }

    // insert componentWillMount
    componentWillMount(){
        var idParam = this.props.match.params.id;
        // axios.get(`/api/users/${idParam}`).then(response => {
        //     this.setState({
        //         user: response.data
        //     })
        // }).catch(console.log)

        
        // axios.get(`/api/blogs?userID=${idParam}`).then(response => {
        //     this.setState({
        //         posts: response.data
        //     })
        // })

        function users() {
            return axios.get(`/api/users/${idParam}`);
        }
        function posts() {
            return axios.get(`/api/blogs?userID=${idParam}`)
        }

        axios.all([users(), posts()]).then(axios.spread((users, posts)=>{
            this.setState({
                user: users.data,
                posts: posts.data
            })
        }))
    }

    render(){
        const user = this.state.user
        const posts = this.state.posts.map((c,i)=><BlogTile key={i} blog={c}/>)
        return (
            <div className='content'>
                <div className="profile">
                        {user.img ? <img src={user.img} alt="profile pic"/> :<img src={'https://unsplash.it/300/?random'} alt="profile pic"/>}
                        <span>
                            <h1>{user.name}</h1>
                            <p>{user.desc}</p>
                            <Link to={`/user/${user.id}/edit`}>
                                <button className="edit-user">Edit User</button>
                            </Link>
                        </span>
                </div>
                <div className="post-list">
                    <h2>Posts by User:</h2>
                    {posts.length? posts : <p>No Blog Posts from this User</p>}
                </div>
            </div>
        )
    }
}

export default User