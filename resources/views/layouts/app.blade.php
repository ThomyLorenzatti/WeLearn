<!DOCTYPE html>
<html lang="en">

    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>We learn</title>
        <link rel="stylesheet" href="/css/app.css">
    	<link href="{{ url('css/custom.css') }}" rel="stylesheet">
    </head>

    <body>
        @include('layouts.header')
        <div class="main-content">
            <div class="container">
                @yield('content')
            </div>
        </div>
        @include('layouts.footer')
        <script src="/js/app.js"></script>
    </body>
</html>
    <script src="http://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js" type="text/javascript"></script>
    <script type="text/javascript" src="{{ URL::asset('js/utils.js') }}"></script>