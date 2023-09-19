import Head from "next/head";
import { useState } from "react";
import { useRouter } from "next/router";
import { signInWithEmailAndPassword } from "firebase/auth";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import { Button, Divider, Input } from "antd";
import styles from "@/styles/Home.module.css";
import { auth } from "@/pages/api/firebase-config";

export default function Home() {
  const router = useRouter();
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);

  const [user, setUser] = useState({});

  const login = async () => {
    try {
      const user = await signInWithEmailAndPassword(
        auth,
        loginEmail,
        loginPassword
      );
      console.log(user);
      setUser(user);
      console.log("User logged in successfully");

      if (user) {
        router.push("/GalleryPage");
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <>
      <Head>
        <title>Daniel Image Gallery</title>
        <meta name="description" content="Daniel Image Gallery" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <div className={styles.container}>
          <div className={styles.leftDiv}>
            <div style={{ display: "block" }}>
              <img
                alt="skull image"
                src="/Group_4.png"
                style={{ width: "400px", height: "400px" }}
              />
              <br />
              <h2 style={{ color: "#73114B" }}>
                Welcome to Daniel Essien's Image Gallery
              </h2>
            </div>
          </div>
          <div className={styles.rightDiv}>
            <div
              style={{
                display: "block",
              }}
            >
              <img
                alt="logo"
                src="/logo1.png"
                style={{ width: "32px", height: "32px" }}
              />
              <div>
                <div style={{ fontSize: 36, color: "black" }}>
                  Login to your account
                </div>
                <div style={{ fontSize: 16, color: "gray" }}>
                  access amazing images for free
                </div>
                <br />
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <Button>Continue with Google</Button>
                </div>
                <Divider>or Sign in with Email</Divider>
              </div>
              <div>
                <Input
                  placeholder="Email"
                  style={{ marginBottom: "16px" }}
                  onChange={(event) => {
                    setLoginEmail(event.target.value);
                    // console.log(200, event.target.value);
                  }}
                />
                <Input.Password
                  placeholder="Input Password"
                  onChange={(event) => {
                    setLoginPassword(event.target.value);
                    // console.log(event.target.value);
                  }}
                  iconRender={(visible) =>
                    visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                  }
                />
                <div
                  style={{
                    marginTop: "16px",
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <Button onClick={login}>Login</Button>
                </div>
                <br />
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    marginTop: "16px",
                  }}
                >
                  <div>
                    Not Registered Yet?{" "}
                    <span style={{ color: "#7F265B" }}>
                      <a href="#">Create an account</a>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
