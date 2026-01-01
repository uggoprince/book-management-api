import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { passportJwtSecret } from 'jwks-rsa';
import { ConfigService } from '@nestjs/config';

/**
 * JWT Strategy for validating Auth0 access tokens
 * This strategy uses JWKS (JSON Web Key Set) to validate tokens
 * issued by Auth0
 */
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private configService: ConfigService) {
    const auth0Domain = configService.get<string>('AUTH0_DOMAIN');
    const auth0Audience = configService.get<string>('AUTH0_AUDIENCE');

    super({
      // Extract JWT from Authorization Bearer header
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),

      // Use JWKS endpoint to get the signing key
      secretOrKeyProvider: passportJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: `https://${auth0Domain}/.well-known/jwks.json`,
      }),
      
      // Validate the token issuer and audience
      issuer: `https://${auth0Domain}/`,
      audience: auth0Audience,
      algorithms: ['RS256'],
    });
  }

  /**
   * Validate the decoded JWT payload
   * This method is called after the token signature is verified
   */
  async validate(payload: any): Promise<any> {
    if (!payload) {
      throw new UnauthorizedException('Invalid token payload');
    }
    
    // Return user information from the token
    return {
      userId: payload.sub,
      email: payload.email,
      permissions: payload.permissions || [],
    };
  }
}
