<samp>

# NGINX

- NGINX is a powerful web server and uses a non-threaded, event-driven architecture.
- It can also do other important things such as `load balancing`, and `HTTP caching`, or be used as a `reverse proxy`.

## Forward Proxy (Ex: VPN)

- Where multiple client request to a proxy/intermediate server(Ex: VPN server) which will redirect(communicate) to an actual server.

## Reverse Proxy (EX: NGINX)

- Where multiple clients request to a proxy/intermediate server(Ex: NGINX server) which will redirect(communicate) to the different servers.
- NGINX will decide that request will be redirect to which server as per the NGINX configuration.

## Advantages

- Can handle 10000 concurrent requests
- Cache HTTP requests
- Act as Reverse Proxy
- Act as Load Balance
- Act as an API Gateway
- Serve and Cache Static files like images, videos, etc.
- Handle SSL Certificates

## Alternates

- Each of these Nginx alternatives has its strengths, and the best choice depends on your specific needs:

1. Use `Apache HTTP Server` if you need a mature, highly configurable web server.
2. Use `Caddy` for simplicity and automatic HTTPS.
3. Use `LiteSpeed` if you need high performance for dynamic content and PHP.
4. Use `HAProxy` if you're looking for advanced load balancing and high availability.
5. Use `Traefik` for containerized environments and microservices.
6. Use `Tomcat` for Java-based applications.
7. Use `OpenResty` if you need Lua scripting capabilities on top of Nginx.

</samp>
