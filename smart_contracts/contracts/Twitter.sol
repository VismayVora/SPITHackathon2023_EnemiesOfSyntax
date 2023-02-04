// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

contract Twitter{
    address payable public owner;
    uint public count=1;
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
    
    constructor() {
        owner = payable(msg.sender);
    }

    mapping (uint => Comment[]) comments;
    mapping (uint => uint) likes;
    mapping (address => uint[]) isLiked;
    mapping (address => Tweet[]) userToTweets;
    Tweet[] publicTweets;
    mapping (uint => Tweet) public tweets;
    uint[] votingTweets;
    mapping (uint => uint) votingOfRemovalTweets;
    mapping (uint => uint) votingOfNotRemovalTweets;
    mapping (address => mapping (uint => bool)) isVotingDone;
    mapping (address => mapping (uint => bool)) isReported;
    mapping (uint => bool) isInVoting;
    mapping (uint => uint) votingTime;
    event addTweetEvent(string  _image_url,string  _tweet_msg,string  _username);
    event removalVote(uint _uid);
    event addTweetToVote(uint _uid);
    event removedTweet(uint _uid);

    function addTweet(string memory _image_url,string memory _tweet_msg,string memory _username) public  {        
        Tweet memory t = Tweet(count,_image_url,_tweet_msg,block.timestamp,msg.sender,_username);
        tweets[count] = t;
        publicTweets.push(t);
        userToTweets[msg.sender].push(t);
        emit addTweetEvent(_image_url, _tweet_msg, _username);
        count+=1;
    }

    function getTweets() public view returns(Tweet[] memory){
        return publicTweets;
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

    function voteForRemoval(uint _uid,bool removal) public {
        require(isVotingDone[msg.sender][_uid]==false,"User already Voted");
        require(votingTime[_uid] > block.timestamp , "Voting time closed");
        isVotingDone[msg.sender][_uid] = true;
        if(removal == true){

        votingOfRemovalTweets[_uid] +=1;
        }
        else{
            votingOfNotRemovalTweets[_uid]+=1;
        }
        emit removalVote(_uid);
    }

    function addPostToVote(uint _uid,uint _days) public{
        require(msg.sender == owner, "User unauthorized");
        votingOfRemovalTweets[_uid] = 0;
        votingOfNotRemovalTweets[_uid] = 0;
        votingTweets.push(_uid);
        uint _votingPeriod = block.timestamp + (_days * 1 days);
        votingTime[_uid] = _votingPeriod;
        isInVoting[_uid] = true;
        emit addTweetToVote(_uid);
    }

    function checkIfAlreadyReported (uint _uid) public  returns(bool){
        if(isReported[msg.sender][_uid]==false){
            isReported[msg.sender][_uid] = true;
            return false;
        }
        return true;
    }

    function getVotingTweets () public view returns(uint[] memory){
        return votingTweets;
    }

    function getResultsOfTweet (uint _uid) public {
        require(msg.sender == owner, "User unauthorized");
        require(votingTime[_uid] < block.timestamp,"Voting is still going on");
        require(_uid < publicTweets.length, "index out of bound");

        uint totalVotes = votingOfNotRemovalTweets[_uid] + votingOfRemovalTweets[_uid];
        uint removalPercentage = (votingOfRemovalTweets[_uid] / totalVotes) * 100;

        if(removalPercentage > 50){
            for (uint i = _uid; i < publicTweets.length - 1; i++) {
                publicTweets[i] = publicTweets[i + 1];
            }
            publicTweets.pop();
        }
    }
    function getUserTweets () public view returns(Tweet[] memory){
        return userToTweets[msg.sender];
    }
}