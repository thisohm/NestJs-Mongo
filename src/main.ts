import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe, BadRequestException } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Set up global validation pipe
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // ตัด properties ของข้อมูลที่ส่งเข้ามาที่ไม่ได้นิยามไว้ใน dto ออกไป
      forbidNonWhitelisted: true, // ตัวเลือกนี้จะทำงานคู่กับ whitelist โดยหากตั้งค่าเป็น true จะทำให้เกิด error ในกรณีนี้มี properties ใดที่ไม่ได้อยู่ใน whitelist ส่งเข้ามา
      transform: true, // ตัวเลือกนี้ทำให้เกิดการแปลงชนิดข้อมูลอัตโนมัติ ในข้อมูลจากภายนอกให้ตรงกับชนิดที่นิยามไว้ใน DTO
      exceptionFactory: (errors) => {
        const messages = errors.map((error) => {
          const constraintsMessages = error.constraints
            ? Object.values(error.constraints).join('. ')
            : 'Unknown error';
          return {
            field: error.property,
            message: constraintsMessages + '.',
          };
        });
        return new BadRequestException({
          message: 'Validation failed',
          errors: messages,
        });
      },
    }),
  );

  await app.listen(3000);
}

bootstrap();
