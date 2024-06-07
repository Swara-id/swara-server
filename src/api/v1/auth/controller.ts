import { Request, Response } from "express";
import {
	getAuth,
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	signOut,
	sendEmailVerification,
	sendPasswordResetEmail,
} from "firebase/auth";

const auth = getAuth();

export const registerUser = (req: Request, res: Response) => {
	const { email, password } = req.body;

	if (!email || !password) {
		return res.status(422).json({
			email: "Email is required",
			password: "Password is required",
		});
	}

	createUserWithEmailAndPassword(auth, email, password)
		.then((userCredential) => {
			const user = auth.currentUser;
			if (user) {
				sendEmailVerification(user)
					.then(() => {
						res.status(201).json({
							message: "Verification email sent! User created successfully!",
						});
					})
					.catch((error) => {
						console.error(error);
						res.status(500).json({ error: "Error sending email verification" });
					});
			} else {
				res.status(500).json({ error: "User is not authenticated" });
			}
		})
		.catch((error) => {
			const errorMessage =
				error.message || "An error occurred while registering user";
			res.status(500).json({ error: errorMessage });
		});
};

export const loginUser = async (req: Request, res: Response) => {
	const { email, password } = req.body;
	if (!email || !password) {
		return res.status(422).json({
			email: "Email is required",
			password: "Password is required",
		});
	}

	try {
		const userCredential = await signInWithEmailAndPassword(
			auth,
			email,
			password
		);
		const idToken = await userCredential.user.getIdToken();

		res.cookie("access_token", idToken, {
			httpOnly: true,
		});
		res
			.status(200)
			.json({ message: "User logged in successfully", userCredential });
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: "An error occurred while logging in" });
	}
};


export const logoutUser = (req:Request, res:Response)=> {
  signOut(auth)
    .then(() => {
      res.clearCookie('access_token');
      res.status(200).json({ message: "User logged out successfully" });
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    });
}

export const resetPassword = (req:Request, res:Response)=>{
  const { email } = req.body;
  if (!email ) {
    return res.status(422).json({
      email: "Email is required"
    });
  }
  sendPasswordResetEmail(auth, email)
    .then(() => {
      res.status(200).json({ message: "Password reset email sent successfully!" });
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    });
}