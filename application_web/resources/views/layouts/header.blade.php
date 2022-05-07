<header id="site-header">
    <button id="burger" class="open-main-nav">
        <span class="burger"></span>
        <span class="burger-text">Menu</span>
    </button>

    <form method="post" action="{{ url('connect')}}" enctype="multipart/form-data">
        {{ csrf_field() }}
        <div class="text-right">
            <button class="btn btn-primary" type="submit">Connexion</button>
        </div>
    </form>
</header>
<div class="container">
</div>