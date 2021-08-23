const userList = document.getElementById("listUsers")
const postList = document.getElementById("listPosts")
const commentList = document.getElementById("listComments")

const TEMPLATE__USER = document.getElementById("temUser").content
const TEMPLATE__POST = document.getElementById("temPost").content
const TEMPLATE__COMMENT = document.getElementById("temComment").content
async function myFetch() {
    const response = await fetch(`https://jsonplaceholder.typicode.com/users/`);
    let date = await response.json()
    console.log(date);

    date.forEach(user => {
        const userTemplate = TEMPLATE__USER.cloneNode(true)

        const name = userTemplate.querySelector("#name")
        const userName = userTemplate.querySelector("#user__name")
        const phoneNumber = userTemplate.querySelector("#phone__number")
        const website = userTemplate.querySelector("#web__site")
        const moreBtn = userTemplate.querySelector("#more")

        name.textContent = user.name
        userName.textContent = user.username
        phoneNumber.textContent = user.phone
        website.textContent = user.website
        moreBtn.dataset.uuid = user.id

        moreBtn.addEventListener('click', (e) => {
            postList.innerHTML = null
            async function myFetch() {
                const response = await fetch(`https://jsonplaceholder.typicode.com/posts/`);
                let date2 = await response.json()
                const postId = e.target.dataset.uuid
                console.log(postId);
                date2.forEach((post) => {
                    if (postId == post.userId) {
                        console.log("ok");
                        const postTemplate = TEMPLATE__POST.cloneNode(true)

                        const postHeader = postTemplate.querySelector("#postHeader")
                        const postbody = postTemplate.querySelector("#postBody")
                        const commentBtn = postTemplate.querySelector("#comments")

                        commentBtn.dataset.uuid = post.id

                        commentBtn.addEventListener('click', (e) => {
                            commentList.innerHTML = null
    
                            async function commentRender() {
                                const response = await fetch(`https://jsonplaceholder.typicode.com/comments/`);
                                let date3 = await response.json()
                                const commentId = e.target.dataset.uuid
                                console.log(date3);
    
                                date3.forEach((comment) => {
                                    if (commentId == comment.postId) {
                                        const commentTemplate = TEMPLATE__COMMENT.cloneNode(true)
    
                                        const commentName = commentTemplate.querySelector('#commentName')
                                        commentName.textContent = comment.name
                                        const commentBody = commentTemplate.querySelector('#commentBody')
                                        commentBody.textContent = comment.body
                                        const commentEmail = commentTemplate.querySelector('#CommentLink')
                                        commentEmail.textContent = comment.email
    
                                        commentList.appendChild(commentTemplate)
    
                                    } else {
                                        console.log("no");
                                    }
                                })
                            }
                            commentRender()
    
                        })

                        postHeader.textContent = post.title
                        postbody.textContent = post.body
                        postList.appendChild(postTemplate)
                    }
                })
            }
            myFetch()
        })
        userList.appendChild(userTemplate)
    });
}
myFetch()