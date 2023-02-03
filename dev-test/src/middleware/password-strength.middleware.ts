import { Injectable, NestMiddleware } from '@nestjs/common';
import { zxcvbn, zxcvbnOptions } from '@zxcvbn-ts/core';
import { Request, Response, NextFunction } from 'express';

import zxcvbnCommonPackage from '@zxcvbn-ts/language-common';
import zxcvbnEnPackage from '@zxcvbn-ts/language-en';

@Injectable()
export class PasswordStrengthMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const password = req.body.password || req.body.newPassword;
    const options = {
      dictionary: {
        ...zxcvbnCommonPackage.dictionary,
        ...zxcvbnEnPackage.dictionary,
      },
      graphs: zxcvbnCommonPackage.adjacencyGraphs,
      translations: zxcvbnEnPackage.translations,
    };
    zxcvbnOptions.setOptions(options);

    const { score, feedback } = zxcvbn(password);

    if (score <= 2) {
      res.status(400).json({
        message: 'Password strength is to low!',
        score,
        feedback,
      });
      return;
    }

    next();
  }
}
