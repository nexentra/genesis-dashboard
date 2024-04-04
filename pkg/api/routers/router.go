package routers

import (
	"context"
	"fmt"
	"net/http"
	"os"
	"os/signal"
	"time"

	"github.com/nexentra/midgard/pkg/clients/logger"
	"github.com/nexentra/midgard/pkg/utils/constants"

	// "github.com/labstack/echo/v4/middleware"
	"github.com/labstack/echo/v4"
)

type Router struct {
	Echo *echo.Echo
	Name string
}

func (r *Router) Init() {
	r.Echo = echo.New()
	r.Echo.HideBanner = true
	r.Echo.Logger = logger.GetLogger()
	// r.Echo.Use(middleware.CORSWithConfig(middleware.CORSConfig{
	// 	AllowCredentials: true,
	// 	AllowMethods:     []string{http.MethodGet, http.MethodPost, http.MethodOptions, http.MethodPut, http.MethodDelete},
	// 	AllowOrigins:     []string{"*", "localhost:3000"},
	// 	AllowHeaders:     []string{"Content-Type", "Authorization", "Bearer", "Bearer ", "content-type", "authorization", "Origin", "Accept"},
	// }))
}

func (r *Router) RegisterPreMiddleware(middleware echo.MiddlewareFunc) {
	r.Echo.Pre(middleware)
}

func (r *Router) RegisterMiddleware(middleware echo.MiddlewareFunc) {
	r.Echo.Use(middleware)
}

func (r *Router) Start(host string, port string) {
	ctx, stop := signal.NotifyContext(context.Background(), os.Interrupt)
	defer stop()
	// Start server
	go func() {
		r.Echo.Logger.Info(fmt.Sprintf("Starting %s server on port: %s", r.Name, port))
		if err := r.Echo.Start(host + ":" + port); err != nil && err != http.ErrServerClosed {
			r.Echo.Logger.Fatal(err)
			r.Echo.Logger.Fatal(constants.MSG_SERVER_SHUTTING_DOWN)
		}
	}()
	// Wait for interrupt signal to gracefully shutdown the server with a timeout of 10 seconds.
	<-ctx.Done()
	ctx, cancel := context.WithTimeout(context.Background(), 20*time.Second)
	defer cancel()
	if err := r.Echo.Shutdown(ctx); err != nil {
		r.Echo.Logger.Fatal(err)
	}
}
