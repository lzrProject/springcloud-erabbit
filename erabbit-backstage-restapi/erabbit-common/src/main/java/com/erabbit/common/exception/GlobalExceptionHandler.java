package com.erabbit.common.exception;


import com.alibaba.fastjson.JSON;
import com.erabbit.common.entity.Result;
import com.erabbit.common.entity.StatusCode;
import com.erabbit.common.entity.servlet.ServletUtil;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.web.HttpRequestMethodNotSupportedException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;

@RestControllerAdvice
@Slf4j
public class GlobalExceptionHandler {

    @ExceptionHandler(Exception.class)
    public Result baseException(Exception e){
        HttpServletResponse response = ServletUtil.getResponse();
        HttpServletRequest request = ServletUtil.getRequest();
        String loginUrl = "http://"+request.getRemoteAddr()+":10013/login/admin";
        log.info("全局捕获异常："+e.getMessage());
        if ("401".equals(e.getMessage().substring(1,4))) {
//            ServletUtil.getResponse().setStatus(HttpStatus.UNAUTHORIZED.value());
            response.setContentType("text/html;charset=UTF-8");
            try {
                response.getWriter().print("<script>" +
                            " window.location.href='"+loginUrl+"';</script>");
            } catch (IOException ioException) {
                ioException.printStackTrace();
            } return null;
        }

        return new Result(false,StatusCode.ERROR_RESPONSE,e.getMessage());
    }

//    @ExceptionHandler(AuthenticationException.class)
//    public void authException(HttpServletRequest request, HttpServletResponse response, AuthenticationException authException){
//        Throwable cause = authException.getCause();
//
//        response.setStatus(HttpStatus.OK.value());
//        response.setHeader("Content-Type", "application/json;charset=UTF-8");
//        try {
//            if (cause instanceof InvalidTokenException) {
//                Result result = new Result(false, StatusCode.ERROR_PERMISSION, "token失效");
//                response.getWriter().write(JSON.toJSONString(result));
//            }
//        } catch (IOException e) {
//            e.printStackTrace();
//        }
//
//    }
}
