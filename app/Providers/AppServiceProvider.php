<?php

namespace App\Providers;

use Illuminate\Support\Facades\Gate;
use Illuminate\Support\ServiceProvider;

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
        $debugEnvVariable = env('APP_DEBUG');

        Gate::define('viewWebTinker', function ($user = null) {
            $debugEnvVariable = env('APP_DEBUG');

            return $debugEnvVariable === 1 || $user?->email === 'admin@farmacia.com';
        });

        Gate::define('viewPulse', function (User $user) {
            return $user->email === 'admin@farmacia.com ';
        });
    }
}
