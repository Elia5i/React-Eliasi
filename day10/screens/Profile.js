import React from "react";

const Profile=()=>{

}
const styles=StyleSheet.create({
    container:{
        flex:1,
        backgroundColor: "#ffffff"
    },
    profileContainer:{
        alignItems:"center",
        padding:20,
        backgroundColor:"#f8f9fa"
        borderBottomLeftRadius:20,
        borderBottomRightRadius:20
    },
    avatar:{
        width:120,
        height:120,
        borderRadius:60,
        marginBottom:10
    },
    profileDetail:{
        alignItems:"center",
        fontWeight:"bold"
    },
    name:{
        fontSize:16,
        fontWeight:"bold"
    },
    role:{
        fontSize:16,
        color:"grey",
        marginVertical:5
    },
    description:{
        textAlign:"center",
        fontSize:14,
        marginBottom:15
    }
})

export default Profile