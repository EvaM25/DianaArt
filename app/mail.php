<?php

require 'phpmailer/PHPMailer.php';
require 'phpmailer/SMTP.php';
require 'phpmailer/Exception.php';

$title = "New message";

$c = true;

$title = "Diana Art";
foreach ( $_POST as $key => $value ) {
  if ( $value != "" && $key != "project_name" && $key != "admin_email" && $key != "form_subject" ) {
    $body .= "
    " . ( ($c = !$c) ? '<tr>':'<tr style="background-color: #f8f8f8;">' ) . "
      <td style='padding: 10px; border: #e9e9e9 1px solid;'><b>$key</b></td>
      <td style='padding: 10px; border: #e9e9e9 1px solid;'>$value</td>
    </tr>
    ";
  }
}

$body = "<table style='width: 100%;'>$body</table>";


$mail = new PHPMailer\PHPMailer\PHPMailer();

try {
    $mail->isSMTP();
    $mail->CharSet = "UTF-8";
    $mail->SMTPAuth = true;
  
    // Настройки почты
    $mail->Host       = 'smtp.gmail.com'; // SMTP сервера почты
    $mail->Username   = 'makeevaeva91@gmail.com'; 
    $mail->Password   = 'pxns gjru nizp qhoz'; 
    $mail->SMTPSecure = 'ssl';
    $mail->Port       = 465;
  
    $mail->setFrom('makeevaeva91@gmail.com', 'New message from your website'); 

      // Получатель письма
    $mail->addAddress('evgesha_331991@mail.ru');
    $mail->addAddress('artist@dianaart.ru ');
    

      // Отправка сообщения
    $mail->isHTML(true);
    $mail->Subject = $title;
    $mail->Body = $body;

    $mail->send();
} catch (Exception $e) {
    $status = "Сообщение не было отправлено. Причина ошибки: {$mail->ErrorInfo}";
  }

  