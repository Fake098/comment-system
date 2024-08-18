import { db } from "@/config/firebase";
import { ReplyData } from "@/utils/types";
import { addDoc, collection, doc, updateDoc } from "firebase/firestore";
import { NextRequest, NextResponse } from "next/server";
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";

export async function POST(request: NextRequest) {
    const body = await request.json();
    const { commentId } = body;

    // Prepare reply data
    const replyData: ReplyData = {
        userId: body.userId,
        userImageUrl: body.userImageUrl,
        username: body.username,
        replyText: body.replyText,
        timestamp: firebase.firestore.Timestamp.now(), // Use Firebase Timestamp
        likes: body.likes || [],
        replies: {}, // Initialize subreplies object
    };

    try {
        // Get a reference to the replies sub-collection under the specified comment
        const repliesCollectionRef = collection(db, `replies/${commentId}/replies`);

        // Add the reply to the replies sub-collection and get the document reference
        const replyDocRef = await addDoc(repliesCollectionRef, replyData);

        // Get the document ID of the newly created reply
        const replyId = replyDocRef.id;

        // Get a reference to the parent comment document
        const commentRef = doc(db, "comments", commentId);

        // Update the replies map in the comment document with the reference to the newly created reply
        await updateDoc(commentRef, {
            [`replies.${replyId}`]: replyDocRef.path, // Store the path to the reply document
        });

        return NextResponse.json({ message: "Reply added successfully", replyId });
    } catch (error) {
        return NextResponse.json({ error: error.message });
    }
}
