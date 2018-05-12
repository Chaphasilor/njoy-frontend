<!DOCTYPE html>
<html>
  <head>

    <title>Portal</title>

    <style>

      body {
        padding: 1%;
      }

      video {
        width: 100%;
        height: auto;
        min-height: 50%;
        margin: 20px auto;
      }

      a {
        font-size: 4em;
        font-family: sans-serif;
        text-decoration: none;
        color: rgb(237, 0, 158);
        display: inline-block;
        width: 48%;
        line-height: 2em;
        margin: 0;
      }

      a:first-of-type {
        text-align: left;
        margin-right: 2%;
      }

      a:last-of-type {
        text-align: right;
      }

    </style>

  </head>
  <body>

    <?php

      $dir = 'videos';
      $files = array_diff(scandir($dir), array('..', '.'));

      if (!empty($_GET[('p')])) {
        $page = $_GET[('p')]-1;
      } else {
        $page = 0;
      }

      $items = 10;
      $range = 2+$page*$items;

      for ($i = $range; $i < $range+$items; $i++) {

        if ($i < sizeof($files)+2) {
          echo "
            <video controls width='400' height='225' oncanplay='createThumb(this);'>
              <source src='".$dir."/".$files[$i]."'>
            </video>
               ";
        }

      }

      if ($page != 0) {
        echo "<a href='index.php?p=".$page."'>Previous Page</a>";
      }

    ?>

    <a href='index.php?p=<?php echo $page+2; ?>'>Next Page</a>


  </body>
</html>
