// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

contract Twitter{
    uint private count=0;
    struct Tweet{
        uint uid;
        string  image_url;
        string  tweet_msg;
        uint timestamp;
        address owner;
        string userName;
    }
    struct Comment{
        string comment_msg;
        address owner_comment;
    }

    mapping (uint => Comment[]) comments;
    mapping (uint => uint) likes;
    mapping (address => uint[]) isLiked;
    mapping (address => Tweet[]) userToTweets;
    Tweet[] tweets;

    event addTweetEvent(string  _image_url,string  _tweet_msg,string  _username);

    function addTweet(string memory _image_url,string memory _tweet_msg,string memory _username) public  {        
        Tweet memory t = Tweet(count,_image_url,_tweet_msg,block.timestamp,msg.sender,_username);
        tweets.push(t);
        userToTweets[msg.sender].push(t);
        emit addTweetEvent(_image_url, _tweet_msg, _username);
        count+=1;
    }
    function getTweets() public view returns(Tweet[] memory){
        return tweets;
    }

    function addComment(uint _uid,string memory _comment_msg) public {
        Comment memory c = Comment(_comment_msg,msg.sender);
        comments[_uid].push(c);
    }

    function getComment(uint _uid) public view returns(Comment[] memory){
        return comments[_uid];
    }

    function likeTheTweet(uint _uid) public {
        isLiked[msg.sender].push(_uid);
        likes[_uid] +=1;
    }

    function getLikesOfPost(uint _uid) public view returns(uint){
        return likes[_uid];
    }

    function getUserLikes() public view returns(uint[] memory){
        return isLiked[msg.sender];
    }

}