<!doctype html>
<html lang="en" >
<head>
  <meta charset="utf-8">
  <title>Apica</title>
  <link rel="stylesheet" href="node_modules/bootstrap/dist/css/bootstrap.css">
  <link rel="stylesheet" href="css/app.css">
</head>
<body ng-app="myApp">


<!-- Main application template, main container start -->
<div class="container" >
  <?php include('partials/navigation.inc'); ?>
  <div ng-view></div>
</div>
<!-- end main application container -->

<script src="node_modules/jquery/dist/jquery.min.js"></script>
<script src="node_modules/bootstrap/dist/js/bootstrap.js"></script>
<script src="node_modules/angular/angular.min.js"></script>
<script src="node_modules/angular-route/angular-route.min.js"></script>
<script src="js/app.js"></script>

</body>
</html>
