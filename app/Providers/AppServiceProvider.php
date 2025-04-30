<?php

namespace App\Providers;

use Illuminate\Support\Facades\Gate;
use Illuminate\Support\ServiceProvider;
use Illuminate\Database\Eloquent\Model;
use App\Models\User;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        Gate::define('viewWebTinker', function (User $user) {
            $debugEnvVariable = env('APP_DEBUG');
            return $debugEnvVariable === 1 || $user?->email === 'admin@farmacia.com';
        });

        Gate::define('viewPulse', function (User $user) {
            return $user->email === 'admin@farmacia.com ';
        });
        Model::automaticallyEagerLoadRelationships();
    }
}
