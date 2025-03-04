<?php
   session_start();
   ob_start();
   include "../model/connect.php";
   include "../model/user.php";

   if((isset($_POST['register'])) && ($_POST['register'])){
        $user = $_POST['logUser'];
        $pass = $_POST['logPassword'];
        $name = $_POST['name'];
        $phone= $_POST['phonenumber'];
        addAccount($user,$pass,$name,$phone);
    }
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="css/login.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <title>Document</title>
    <style>
        body {
            background-image:linear-gradient(to right,rgba(27,31,52,0.8),rgba(27,31,52,0.8)), url('image/bia.jpg');
            background-size: cover;
        }
    </style>
</head>

<body>
    <form action="<?php echo $_SERVER['PHP_SELF'] ?>" method="post">
        <div class="container">
            <div class="box">
                <!------------------ Login Box --------------------->
                <div class="box-login" id="login">
                    <i class="fas fa-times fa-right fa-lg" id="next" onclick="exit()"></i>
                    <div class="top-header">
                        <h3>Welcome</h3>
                    </div>
                    <div class="input-group">
                        <div class="input-field">
                            <input type="text" class="input-box" id="logUser" name="logUser" required>
                            <label for="logUser">Username</label>
                        </div>
                        <div class="input-field">
                            <input type="password" class="input-box" id="logPassword" name="logPassword" required>
                            <label for="logPassword">Password</label>
                            <div class="eye-area">
                                <div class="eye-box" onclick="myLogPassword()">
                                    <i class="fa-regular fa-eye" id="eye"></i>
                                    <i class="fa-regular fa-eye-slash" id="eye-slash"></i>
                                </div>
                            </div>
                        </div>
                        <div class="input-field">
                            <input type="text" class="input-box" id="name" name="name" required>
                            <label for="name">Name</label>
                        </div>
                        <div class="input-field">
                            <input type="text" class="input-box" id="phonenumber" name="phonenumber" required>
                            <label for="phonenumber">Phone number</label>
                        </div>
                        <div class="input-field">
                            <input type="submit" class="input-submit" value="Sign Up" name="register">
                        </div>
                        <?php 
                            if(isset($txt_error) &&($txt_error!="")){
                                echo "<font color='black'>".$txt_error."</font>";
                            }
                        ?>
                        <div class="forgot">
                            <a href="login.php">Back to Login !</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </form>    
    <script>
        // view password codes

        function myLogPassword() {
            var a = document.getElementById('logPassword');
            var b = document.getElementById('eye');
            var c = document.getElementById('eye-slash');
            if (a.type === "password") {
                a.type = "text"
                b.style.opacity = "0";
                c.style.opacity = "1";
            } else {
                a.type = "password"
                b.style.opacity = "1";
                c.style.opacity = "0";
            }
        }
        function exit(){
            window.location.href = "home.php";
        }
    </script>
</body>

</html>