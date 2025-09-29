<?php

class Cconexion{
    public static function ConexionBD(){

        $host='10.100.1.4\AXSQLSERVER';
        $BBDD='JDP';
        $username='PQ';
        $contraseña='Qwerty2023!';
        $puerto=49828;
        try{
            $conn= new PDO("sqlsrv:Server=$host,$puerto;Database=$BBDD;TrustServerCertificate=true",$username,$contraseña);
            echo "Se conecto correctamente a la base de Datos de Produccion<br>";
            echo "10.100.1.4\\AXSQLSERVER<br>";
            echo "PORT: 49828<br>";
        }
        catch(PDOExeption $exp){
            
            echo "no se conecto a la base de datos: $BBDD, error: $exp";
        }
        return $conn;
    }
}
?>